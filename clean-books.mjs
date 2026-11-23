import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const dbPath = path.resolve(process.cwd(), "data/bookstore.db");
const db = new DatabaseSync(dbPath);



try {
  // ۱. غیرفعال کردن موقت بررسی Foreign Key
  db.exec("PRAGMA foreign_keys = OFF;");
  db.exec("BEGIN TRANSACTION;");

  // ۲. پاکسازی جداول وابسته احتمالی
  const tables = ["cart_items", "order_items", "reviews", "book_categories", "translations"];
  for (const table of tables) {
    try {
      const res = db.prepare(`DELETE FROM ${table} WHERE book_id > 12`).run();
      console.log(`حذف از ${table}: ${res.changes} رکورد`);
    } catch {
      // اگر جدول در اسکیمای شما نبود رد شود
    }
  }

  // ۳. حذف خود کتاب‌ها
  const delBooks = db.prepare("DELETE FROM books WHERE id > 12").run();
  console.log(`تعداد کتاب‌های حذف‌شده: ${delBooks.changes}`);

  db.exec("COMMIT;");
} catch (error) {
  db.exec("ROLLBACK;");
  console.error("خطا در هنگام پاکسازی:", error);
} finally {
  // فعال‌سازی مجدد Foreign Keys
  db.exec("PRAGMA foreign_keys = ON;");
}

// نمایش کتاب‌های باقیمانده جهت اطمینان
const remainingBooks = db.prepare("SELECT id FROM books").all();
console.log(`تعداد کتاب‌های باقی‌مانده: ${remainingBooks.length}`);
console.log("شناسه‌ها:", remainingBooks.map((b) => b.id));

db.close();
console.log("عملیات به پایان رسید.");
