import db from "@/lib/db";
import {
  CartItemRow,
  CheckoutRequest,
  CheckoutResult,
} from "@/features/carts/cart.type";

const SHIPPING_FEE = 10;

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

    // ۲. اعتبارسنجی مجدد موجودی انبار قبل از نهایی‌سازی خرید
    for (const item of cartItems) {
      if (item.stock < item.quantity) {
        throw new Error(`موجودی کتاب با شناسه ${item.book_id} کافی نیست.`);
      }
    }

    // ۳. محاسبه هزینه‌ها
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    const shippingFee = SHIPPING_FEE;
    const total = subtotal + shippingFee;
    const trackingCode = generateTrackingCode();

    // ۴. ایجاد رکورد سفارش
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
      checkoutData.shippingMethod,
      checkoutData.deliveryDate,
      checkoutData.deliveryTime,
    );

    const orderId = Number(orderResult.lastInsertRowid);
    if (!orderId) {
      throw new Error("خطا در ایجاد سفارش.");
    }

    // ۵. استیتمنت‌های ثبت آیتم و کسر موجودی
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

    // ۶. اجرای ثبت آیتم‌ها و کسر همزمان موجودی از جدول books
    for (const item of cartItems) {
      createOrderItemStmt.run(orderId, item.book_id, item.quantity, item.price);
      deductStockStmt.run(item.quantity, item.book_id); // 👈 کسر موجودی از انبار
    }

    // ۷. پاک کردن سبد خرید کاربر
    const clearCartStmt = db.prepare(`
      DELETE FROM cart_items
      WHERE user_id = ?
    `);
    clearCartStmt.run(userId);

    db.exec("COMMIT");

    return {
      orderId: orderId,
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
