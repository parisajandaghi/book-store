import { hashPassword } from "@/lib/auth";
import db from "@/lib/db";
import { DBUser, User } from "@/types/user.type";

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

export function updateProfile(userId: number, updates: Partial<User>): User {
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
    WHERE email = ?
  `);

  const user = stmt.get(email) as DBUser | undefined;

  return user ?? null;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await hashPassword(data.password);

  const stmt = db.prepare(`
    INSERT INTO users (
      name,
      email,
      password,
      role
    )
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(data.name, data.email, hashedPassword, "user");

  return {
    id: Number(result.lastInsertRowid),
    name: data.name,
    email: data.email,
    role: "user",
  };
}
