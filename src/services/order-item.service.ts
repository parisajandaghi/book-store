import db from "@/lib/db";
import { OrderItem } from "@/features/orders/order-item.type";

export function getOrderItems(): OrderItem[] {
  const stmt = db.prepare(`SELECT * FROM order_items`);
  return stmt.all() as unknown as OrderItem[];
}

export function createOrderItem(
  item: Omit<OrderItem, "id">,
): OrderItem {
  const stmt = db.prepare(`
    INSERT INTO order_items (order_id, book_id, quantity, price)
    VALUES (?, ?, ?, ?)
  `);

  const info = stmt.run(item.order_id, item.book_id, item.quantity, item.price);

  const getStmt = db.prepare(`SELECT * FROM order_items WHERE id = ?`);
  return getStmt.get(Number(info.lastInsertRowid)) as unknown as OrderItem;
}

export function updateOrderItem(
  id: number,
  updates: Partial<Pick<OrderItem, "quantity" | "price">>,
): OrderItem {
  const updateFields: string[] = [];
 type SqliteParam = string | number | null | Buffer;
const values: SqliteParam[] = [];

  if (updates.quantity !== undefined) {
    updateFields.push("quantity = ?");
    values.push(updates.quantity);
  }
  if (updates.price !== undefined) {
    updateFields.push("price = ?");
    values.push(updates.price);
  }

  if (updateFields.length === 0) {
    throw new Error("هیچ داده‌ای برای آپدیت ارسال نشده است.");
  }

  const setClause = updateFields.join(", ");
  const stmt = db.prepare(`
    UPDATE order_items
    SET ${setClause}
    WHERE id = ?
  `);

  stmt.run(...values, id);

  const getStmt = db.prepare(`SELECT * FROM order_items WHERE id = ?`);
  return getStmt.get(id) as unknown as OrderItem;
}

export function deleteOrderItem(id: number): void {
  const stmt = db.prepare(`DELETE FROM order_items WHERE id = ?`);
  stmt.run(id);
}
