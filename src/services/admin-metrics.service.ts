import db from "@/lib/db";

export class AdminMetricsService {
  private static fillLast7Days(
    rows: { day: string; count: number }[],
  ): number[] {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    });

    const map = new Map(rows.map((r) => [r.day, r.count]));
    return last7Days.map((day) => map.get(day) || 0);
  }

  static getDashboardMetrics() {
    const books = db.prepare(`SELECT SUM(stock) AS total FROM books`).get() as {
      total: number;
    };

    const customers = db
      .prepare(
        `
      SELECT COUNT(*) AS total FROM users 
      WHERE LOWER(role) = 'user' AND created_at >= datetime('now', '-30 days', 'localtime')
    `,
      )
      .get() as { total: number };

    const active = db
      .prepare(
        `
      SELECT COUNT(*) AS total FROM orders 
      WHERE LOWER(status) IN ('pending', 'processing', 'shipped')
    `,
      )
      .get() as { total: number };

    const revenue = db
      .prepare(
        `
      SELECT COALESCE(SUM(total), 0) AS total FROM orders 
      WHERE LOWER(status) NOT IN ('cancelled', 'canceled')
    `,
      )
      .get() as { total: number };

    const revenueRows = db
      .prepare(
        `
      SELECT date(created_at, 'localtime') AS day, COALESCE(SUM(total), 0) AS count
      FROM orders
      WHERE LOWER(status) NOT IN ('cancelled', 'canceled')
        AND created_at >= date('now', '-6 days', 'localtime')
      GROUP BY day
    `,
      )
      .all() as { day: string; count: number }[];

    const ordersRows = db
      .prepare(
        `
      SELECT date(created_at, 'localtime') AS day, COUNT(*) AS count
      FROM orders
      WHERE created_at >= date('now', '-6 days', 'localtime')
      GROUP BY day
    `,
      )
      .all() as { day: string; count: number }[];

    const customersRows = db
      .prepare(
        `
      SELECT date(created_at, 'localtime') AS day, COUNT(*) AS count
      FROM users
      WHERE LOWER(role) = 'user' AND created_at >= date('now', '-6 days', 'localtime')
      GROUP BY day
    `,
      )
      .all() as { day: string; count: number }[];

    const booksRows = db
      .prepare(
        `
      SELECT date(created_at, 'localtime') AS day, COUNT(*) AS count
      FROM books
      WHERE created_at >= date('now', '-6 days', 'localtime')
      GROUP BY day
    `,
      )
      .all() as { day: string; count: number }[];

    return {
      booksInStock: books?.total || 0,
      newCustomers: customers?.total || 0,
      activeOrders: active?.total || 0,
      totalRevenue: revenue?.total || 0,

      revenueHistory: this.fillLast7Days(revenueRows),
      ordersHistory: this.fillLast7Days(ordersRows),
      customersHistory: this.fillLast7Days(customersRows),
      booksHistory: this.fillLast7Days(booksRows),
    };
  }
}
