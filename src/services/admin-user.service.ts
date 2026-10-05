// E:\reactdeveloper\bookstore-project\book-store\src\services\admin-user.service.ts
import db from "@/lib/db";
import { UpdateUserDTO, User } from "@/types/user.type";
import { getProfile } from "./user.service";

type SqliteParam = string | number | null;

// دریافت لیست کاربران همراه با تعداد سفارش‌ها، صفحه‌بندی و فیلتر
export function getAllUsers({
  page = 1,
  limit = 10,
  search = "",
  role = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}): { data: User[]; total: number; page: number; totalPages: number } {
  const offset = (page - 1) * limit;
  const whereClauses: string[] = [];
  const params: SqliteParam[] = [];

  if (search.trim()) {
    whereClauses.push("(u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)");
    const searchTerm = `%${search.trim()}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  if (role.trim()) {
    whereClauses.push("u.role = ?");
    params.push(role.trim());
  }

  const whereSql =
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  // شمارش کل کاربران با فیلتر
  const countStmt = db.prepare(`
    SELECT COUNT(*) as total 
    FROM users u 
    ${whereSql}
  `);
  const countResult = countStmt.get(...params) as { total: number };
  const total = countResult?.total || 0;

  // دریافت کاربران همراه با تعداد سفارشات
  const dataStmt = db.prepare(`
    SELECT 
      u.id, 
      u.name, 
      u.email, 
      u.phone, 
      u.role, 
      u.created_at,
      COUNT(o.id) as orders_count
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    ${whereSql}
    GROUP BY u.id
    ORDER BY u.id DESC
    LIMIT ? OFFSET ?
  `);

  const users = dataStmt.all(...params, limit, offset) as unknown as User[];

  return {
    data: users,
    total,
    page,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

// آپدیت کاربر یا نقش او توسط ادمین
export function updateUserByAdmin(
  userId: number,
  updates: UpdateUserDTO,
): User {
  const updateFields: string[] = [];
  const values: SqliteParam[] = [];

  if (updates.name !== undefined) {
    updateFields.push("name = ?");
    values.push(updates.name);
  }
  if (updates.email !== undefined) {
    updateFields.push("email = ?");
    values.push(updates.email);
  }
  if (updates.phone !== undefined) {
    updateFields.push("phone = ?");
    values.push(updates.phone);
  }
  if (updates.role !== undefined) {
    updateFields.push("role = ?");
    values.push(updates.role);
  }

  if (updateFields.length === 0) {
    throw new Error("داده‌ای برای آپدیت ارسال نشده است.");
  }

  const stmt = db.prepare(`
    UPDATE users 
    SET ${updateFields.join(", ")} 
    WHERE id = ?
  `);

  stmt.run(...values, userId);

  return getProfile(userId);
}
