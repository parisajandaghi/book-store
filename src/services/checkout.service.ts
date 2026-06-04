import db from "@/lib/db";
import { CartItemRow, CheckoutResult } from "@/features/carts/cart.type";

export function checkout(userId: number): CheckoutResult {
  db.exec("BEGIN TRANSACTION;");

  try {
    // اصلاح نام ستون‌ها: user_id و book_id
    const getCartItemsStmt = db.prepare(`
      SELECT c.id, c.book_id, c.quantity, b.price
      FROM cart_items c
      JOIN books b ON c.book_id = b.id
      WHERE c.user_id = ?
    `);

    const cartItems = getCartItemsStmt.all(userId) as unknown as CartItemRow[];

    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    const totalAmount = cartItems.reduce((sum, item) => {
      if (item.price === undefined || item.price === null) {
        throw new Error(`Book price not found for book ID ${item.book_id}`);
      }
      return sum + item.quantity * item.price;
    }, 0);

    // اصلاح نام ستون‌های جدول orders: از total_amount به total و از order_date به created_at
    const insertOrderStmt = db.prepare(`
      INSERT INTO orders (user_id, created_at, total)
      VALUES (?, CURRENT_TIMESTAMP, ?)
    `);

    const orderResult = insertOrderStmt.run(userId, totalAmount);
    const orderId = orderResult.lastInsertRowid as number;

    const insertOrderItemStmt = db.prepare(`
      INSERT INTO order_items (order_id, book_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `);

    for (const item of cartItems) {
      // استفاده از item.book_id به جای item.bookId
      insertOrderItemStmt.run(orderId, item.book_id, item.quantity, item.price);
    }

    // اصلاح نام ستون: user_id
    const deleteCartItemsStmt = db.prepare(
      `DELETE FROM cart_items WHERE user_id = ?`,
    );
    deleteCartItemsStmt.run(userId);

    db.exec("COMMIT;");

    return {
      order_id: orderId.toString(), // هماهنگی با CheckoutResult
      total: totalAmount,
    };
  } catch (error) {
    db.exec("ROLLBACK;");
    throw error;
  }
}
