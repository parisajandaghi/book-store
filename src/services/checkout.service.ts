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
    // گرفتن آیتم‌های سبد خرید
    const cartItemsStmt = db.prepare(`
      SELECT
        c.book_id,
        c.quantity,
        b.price
      FROM cart_items c
      INNER JOIN books b
      ON b.id = c.book_id
      WHERE c.user_id = ?
    `);

    const cartItems = cartItemsStmt.all(userId) as unknown as CartItemRow[];

    if (cartItems.length === 0) {
      throw new Error("Cart is empty.");
    }

    // محاسبه subtotal
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    const shippingFee = SHIPPING_FEE;

    const total = subtotal + shippingFee;

    const trackingCode = generateTrackingCode();

    // ایجاد سفارش
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
      throw new Error("Failed to create order.");
    }

    // ثبت آیتم‌های سفارش
    const createOrderItemStmt = db.prepare(`
      INSERT INTO order_items (

        order_id,

        book_id,

        quantity,

        price

      )

      VALUES (

        ?,

        ?,

        ?,

        ?

      )
    `);

    for (const item of cartItems) {
      createOrderItemStmt.run(orderId, item.book_id, item.quantity, item.price);
    }

    // پاک کردن سبد خرید
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
