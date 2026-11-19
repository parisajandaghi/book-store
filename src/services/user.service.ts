import { hashPassword } from "@/lib/auth";
import db from "@/lib/db";
import { DBUser, UpdateUserDTO, User } from "@/types/user.type";

type SqliteParam = string | number | null;

export function getProfile(userId: number): User {
  const stmt = db.prepare(`
    SELECT * FROM users 
    WHERE id = ?
  `);

  const user = stmt.get(userId) as DBUser | undefined;

  if (!user) {
    throw new Error("کاربر پیدا نشد");
  }

  const { password, ...safeUser } = user;

  return safeUser;
}

export async function updateProfile(
  userId: number,
  updates: Partial<User & { password?: string }>,
): Promise<User> {
  const updateFields: string[] = [];
  const values: SqliteParam[] = [];

  if (updates.name !== undefined) {
    updateFields.push("name = ?");
    values.push(updates.name.trim());
  }

  if (updates.email !== undefined) {
    const normalizedEmail = updates.email.trim().toLowerCase();

    // بررسی اینکه ایمیل جدید تکراری نباشد
    const existing = db
      .prepare("SELECT id FROM users WHERE LOWER(email) = ? AND id != ?")
      .get(normalizedEmail, userId);

    if (existing) {
      throw new Error("این ایمیل قبلاً توسط کاربر دیگری ثبت شده است.");
    }

    updateFields.push("email = ?");
    values.push(normalizedEmail);
  }

  if (updates.phone !== undefined) {
    updateFields.push("phone = ?");
    values.push(updates.phone ? updates.phone.trim() : null);
  }

  // هش و ذخیره رمز عبور جدید (در صورتی که ارسال شده باشد)
  if (updates.password && updates.password.trim().length >= 6) {
    const hashedPassword = await hashPassword(updates.password.trim());
    updateFields.push("password = ?");
    values.push(hashedPassword);
  }

  if (updateFields.length === 0) {
    throw new Error("هیچ داده‌ مجازی برای آپدیت ارسال نشده است.");
  }

  const setClause = updateFields.join(", ");

  const stmt = db.prepare(`
    UPDATE users
    SET ${setClause}
    WHERE id = ?
  `);

  stmt.run(...values, userId);

  return getProfile(userId);
}

export function getUserByEmail(email: string): DBUser | null {
  const stmt = db.prepare(`
    SELECT * FROM users
    WHERE LOWER(email) = ?
  `);

  const user = stmt.get(email.trim().toLowerCase()) as DBUser | undefined;

  return user ?? null;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) {
  const hashedPassword = await hashPassword(data.password.trim());
  const normalizedEmail = data.email.trim().toLowerCase();

  const stmt = db.prepare(`
    INSERT INTO users (
      name,
      email,
      password,
      phone,
      role
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    data.name.trim(),
    normalizedEmail,
    hashedPassword,
    data.phone ? data.phone.trim() : null,
    "user",
  );

  return {
    id: Number(result.lastInsertRowid),
    name: data.name,
    email: normalizedEmail,
    phone: data.phone,
    role: "user",
  };
}

// دریافت لیست کاربران با سرچ، فیلتر نقش و صفحه‌بندی (همراه با تعداد سفارش‌ها)
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
    whereClauses.push(
      "(u.name LIKE ? OR LOWER(u.email) LIKE ? OR u.phone LIKE ?)",
    );
    const searchTerm = `%${search.trim().toLowerCase()}%`;
    params.push(`%${search.trim()}%`, searchTerm, `%${search.trim()}%`);
  }

  if (role.trim()) {
    whereClauses.push("u.role = ?");
    params.push(role.trim());
  }

  const whereSql =
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  // شمارش کل
  const countStmt = db.prepare(`
    SELECT COUNT(*) as total 
    FROM users u 
    ${whereSql}
  `);
  const countResult = countStmt.get(...params) as { total: number };
  const total = countResult?.total || 0;

  // دریافت داده‌ها همراه با تعداد سفارشات کاربر
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
