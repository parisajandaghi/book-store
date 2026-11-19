import db from "@/lib/db";
import {
  CartItemRow,
  CheckoutRequest,
  CheckoutResult,
} from "@/features/carts/cart.type";
import { getStoreSettings } from "@/services/store-setting.service";

function generateTrackingCode() {
  return `BS${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;
}

export function checkout(
  userId: number,
  checkoutData: CheckoutRequest,
): CheckoutResult {
  db.exec("BEGIN TRANSACTION");

  try {
    // ۱. دریافت آیتم‌های سبد خرید به همراه موجودی فعلی انبار
    const cartItemsStmt = db.prepare(`
      SELECT
        c.book_id,
        c.quantity,
        b.price,
        b.stock
      FROM cart_items c
      INNER JOIN books b
      ON b.id = c.book_id
      WHERE c.user_id = ?
    `);

    const cartItems = cartItemsStmt.all(userId) as unknown as (CartItemRow & {
      stock: number;
    })[];

    if (cartItems.length === 0) {
      throw new Error("سبد خرید شما خالی است.");
    }

    // ۲. اعتبارسنجی موجودی انبار قبل از نهایی‌سازی خرید
    for (const item of cartItems) {
      if (item.stock < item.quantity) {
        throw new Error(`موجودی کتاب با شناسه ${item.book_id} کافی نیست.`);
      }
    }

    // ۳. محاسبه ساب‌توتال (مجموع قیمت کالاها)
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    // ۴. دریافت تنظیمات ارسال داینامیک از جدول store_settings
    const settings = getStoreSettings();
    const baseShippingRate = Number(settings.shipping_rate) || 0;
    const freeShippingThreshold = Number(settings.free_shipping_threshold) || 0;
    const isFreeShipping = subtotal >= freeShippingThreshold;

    // ۵. محاسبه هزینه ارسال بر اساس متد انتخابی کاربر
    let shippingFee = 0;
    const method = checkoutData.shippingMethod || "standard";

    if (method === "express") {
      // هزینه پیشتاز (نرخ پایه + ۱۰۰ هزار تومان اکسپرس)، در صورت سقف ارسال رایگان فقط هزینه اکسپرس دریافت می‌شود
      const expressSurcharge = 100000;
      shippingFee = isFreeShipping ? expressSurcharge : baseShippingRate + expressSurcharge;
    } else {
      // روش عادی (standard)
      shippingFee = isFreeShipping ? 0 : baseShippingRate;
    }

    const total = subtotal + shippingFee;
    const trackingCode = generateTrackingCode();

    // ۶. ایجاد رکورد سفارش
    const createOrderStmt = db.prepare(`
      INSERT INTO orders (
        user_id,
        subtotal,
        shipping_fee,
        total,
        recipient_name,
        phone,
        address,
        tracking_code,
        address_id,
        shipping_method,
        delivery_date,
        delivery_time,
        status
      )
      VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        'pending'
      )
    `);

    const orderResult = createOrderStmt.run(
      userId,
      subtotal,
      shippingFee,
      total,
      checkoutData.recipientName,
      checkoutData.phone,
      checkoutData.address,
      trackingCode,
      checkoutData.addressId,
      method,
      checkoutData.deliveryDate,
      checkoutData.deliveryTime,
    );

    const orderId = Number(orderResult.lastInsertRowid);
    if (!orderId) {
      throw new Error("خطا در ایجاد سفارش.");
    }

    // ۷. ثبت آیتم‌ها و کسر همزمان موجودی از جدول books
    const createOrderItemStmt = db.prepare(`
      INSERT INTO order_items (
        order_id,
        book_id,
        quantity,
        price
      )
      VALUES (?, ?, ?, ?)
    `);

    const deductStockStmt = db.prepare(`
      UPDATE books
      SET stock = stock - ?
      WHERE id = ?
    `);

    for (const item of cartItems) {
      createOrderItemStmt.run(orderId, item.book_id, item.quantity, item.price);
      deductStockStmt.run(item.quantity, item.book_id);
    }

    // ۸. پاک کردن سبد خرید کاربر
    const clearCartStmt = db.prepare(`
      DELETE FROM cart_items
      WHERE user_id = ?
    `);
    clearCartStmt.run(userId);

    db.exec("COMMIT");

    return {
      orderId,
      trackingCode,
      subtotal,
      shippingFee,
      total,
    };
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}
