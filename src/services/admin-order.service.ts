// src/services/admin-order.service.ts
import db from "@/lib/db";
import { Order } from "@/features/orders/order.type";
import { OrderItem } from "@/features/orders/order-item.type";

export const adminOrderService = {
  getAllOrders: () => {
    const stmt = db.prepare(`
      SELECT 
        o.id,
        o.total,
        o.status,
        o.created_at,
        o.recipient_name,
        o.tracking_code,
        u.name AS customer_name,
        u.email AS customer_email
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);

    return stmt.all();
  },

  getAdminOrderById: (orderId: number) => {
    const orderStmt = db.prepare(`
      SELECT 
        o.*,
        u.name AS customer_name,
        u.email AS customer_email
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      WHERE o.id = ?
    `);

    const order = orderStmt.get(orderId) as unknown as Order;
    console.log('order', order);

    if (!order) {
      return null;
    }

    const itemsStmt = db.prepare(`
      SELECT
        order_items.*,
        books.image_url,
        translations.title,
        translations.author
      FROM order_items
      JOIN books ON books.id = order_items.book_id
      LEFT JOIN translations ON translations.book_id = books.id AND translations.language_code = 'en'
      WHERE order_items.order_id = ?
      GROUP BY order_items.id
    `);

    const items = itemsStmt.all(order.id) as unknown as OrderItem[];

    return {
      ...order,
      order_items: items,
    };
  },

  updateOrder: (
    orderId: number,
    data: { status?: string; tracking_code?: string }
  ) => {
    const updates: string[] = [];
    const values: (string | number)[] = [];

    if (data.status !== undefined) {
      updates.push("status = ?");
      values.push(data.status);
    }

    if (data.tracking_code !== undefined) {
      updates.push("tracking_code = ?");
      values.push(data.tracking_code);
    }

    if (updates.length > 0) {
      values.push(orderId);
      const updateStmt = db.prepare(`
        UPDATE orders
        SET ${updates.join(", ")}
        WHERE id = ?
      `);
      updateStmt.run(...values);
    }

    // بازگرداندن اطلاعات به‌روزرسانی‌شده سفارش
    return adminOrderService.getAdminOrderById(orderId);
  },
};
