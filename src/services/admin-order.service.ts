
import db from "@/lib/db";
import { Order } from "@/features/orders/order.type";
import { OrderItem } from "@/features/orders/order-item.type";
import { Translation } from "@/features/books/book.type";

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

    const order = orderStmt.get(orderId) as Order | undefined;

    if (!order) {
      return null;
    }

    const itemsStmt = db.prepare(`
      SELECT
        order_items.*,
        books.image_url,
        json_group_array(
          json_object(
            'id', translations.id,
            'book_id', translations.book_id,
            'language_code', translations.language_code,
            'title', translations.title,
            'author', translations.author,
            'description', translations.description
          )
        ) AS translations
      FROM order_items
      JOIN books ON books.id = order_items.book_id
      LEFT JOIN translations ON translations.book_id = books.id
      WHERE order_items.order_id = ?
      GROUP BY order_items.id
    `);

    type RawDbOrderItem = Omit<OrderItem, "translations"> & {
      translations: string;
    };

    const rawItems = itemsStmt.all(order.id) as RawDbOrderItem[];

    const items: OrderItem[] = rawItems.map((item) => ({
      ...item,
      translations: item.translations
        ? (JSON.parse(item.translations) as Translation[])
        : [],
    }));

    return {
      ...order,
      order_items: items,
    };
  },

  updateOrder: (
    orderId: number,
    data: { status?: string; tracking_code?: string },
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
