import { Order } from "@/features/orders/order.type";
import { OrderItem } from "@/features/orders/order-item.type";
import db from "@/lib/db";

export function getOrdersByUserId(userId: number): Order[] {
  const stmt = db.prepare(`
    SELECT * FROM orders 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `);
  return stmt.all(userId) as unknown as Order[];
}

export function getOrderHistory(userId: number) {
  const ordersStmt = db.prepare(`
    SELECT * FROM orders 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `);
  const orders = ordersStmt.all(userId) as unknown as Order[];

  const itemsStmt = db.prepare(`
    SELECT * FROM order_items 
    WHERE order_id = ?
  `);

  const history = orders.map((order) => {
    const items = itemsStmt.all(order.id) as unknown as OrderItem[];
    return {
      ...order,
      order_items: items,
    };
  });

  return history;
}

export function createOrder(
  userId: number,
  subtotal: number,
  shippingFee: number,
  total: number,
  recipientName: string,
  phone: string,
  address: string,
): Order {
  const stmt = db.prepare(`
    INSERT INTO orders (
      user_id, 
      subtotal,        -- اصلاح نام ستون
      shipping_fee, 
      total,           -- اصلاح نام ستون
      recipient_name, 
      phone, 
      address, 
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
  `);

  const info = stmt.run(
    userId,
    subtotal,
    shippingFee,
    total,
    recipientName,
    phone,
    address,
  );

  const getStmt = db.prepare(`SELECT * FROM orders WHERE id = ?`);
  return getStmt.get(Number(info.lastInsertRowid)) as unknown as Order;
}

export function updateOrder(
  orderId: number,
  userId: number,
  updates: Partial<
    Pick<Order, "status" | "subtotal" | "shipping_fee" | "total">
  >,
) {
  const updateFields: string[] = [];

  const values: (string | number | null)[] = [];

  if (updates.status !== undefined) {
    updateFields.push("status = ?");
    values.push(updates.status);
  }

  if (updates.subtotal !== undefined) {
    updateFields.push("subtotal = ?");
    values.push(updates.subtotal);
  }

  if (updates.shipping_fee !== undefined) {
    updateFields.push("shipping_fee = ?");
    values.push(updates.shipping_fee);
  }

  if (updates.total !== undefined) {
    updateFields.push("total = ?");
    values.push(updates.total);
  }

  if (updateFields.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(orderId, userId);

  const query = `
    UPDATE orders 
    SET ${updateFields.join(", ")} 
    WHERE id = ? AND user_id = ?
  `;

  db.prepare(query).run(...values);

  const getStmt = db.prepare(`SELECT * FROM orders WHERE id = ?`);
  return getStmt.get(orderId) as unknown as Order;
}

export function deleteOrder(orderId: number, userId: number): void {
  const stmt = db.prepare(`
    DELETE FROM orders 
    WHERE id = ? AND user_id = ?
  `);
  stmt.run(orderId, userId);
}
