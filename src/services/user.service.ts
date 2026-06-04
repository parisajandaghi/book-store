import db from "@/lib/db";
import { DBUser, User } from "@/types/user.type";

// تعریف دقیق تایپ‌ها به جای استفاده از any
type SqliteParam = string | number | null;

export function getProfile(userId: number): User {
  const stmt = db.prepare(`
    SELECT * FROM users 
    WHERE id = ?
  `);

  const user = stmt.get(userId) as unknown as DBUser | undefined;

  if (!user) {
    throw new Error("کاربر پیدا نشد");
  }

  const { password, role, ...safeUser } = user;

  return safeUser;
}

export function updateProfile(
  userId: number,
  updates: Partial<User>,
): User {
  const updateFields: string[] = [];
  const values: SqliteParam[] = [];

  // بررسی صریح فیلدهای مجاز و حذف کامل Object.keys و any
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
