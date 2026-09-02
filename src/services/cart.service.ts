import db from "@/lib/db";
import { Book, Translation } from "@/features/books/book.type";
import { CartItem } from "@/features/carts/cart.type";

export function getCart(userId: number): CartItem[] {
  const stmt = db.prepare(`
    SELECT * FROM cart_items 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `);

  const items = stmt.all(userId) as unknown as CartItem[];

  if (items.length === 0) return [];

  const bookIds = items.map((item) => item.book_id);
  const placeholders = bookIds.map(() => "?").join(",");

  const booksStmt = db.prepare(
    `SELECT * FROM books WHERE id IN (${placeholders})`,
  );
  const books = booksStmt.all(...bookIds) as unknown as Book[];
  const translationsStmt = db.prepare(`
  SELECT *
  FROM translations
  WHERE book_id IN (${placeholders})
`);

  const translations = translationsStmt.all(
    ...bookIds,
  ) as unknown as Translation[];

  return items.map((item) => {
    const book = books.find((b) => b.id === item.book_id);

    if (!book) {
      throw new Error(`Book ${item.book_id} not found.`);
    }

    return {
      id: item.id,
      book_id: item.book_id,
      quantity: item.quantity,

      price: book.price,
      image_url: book.image_url,

      translations: translations.filter(
        (translation) => translation.book_id === item.book_id,
      ),
    };
  });
}

export function addToCart(
  userId: number,
  bookId: number,
  quantity: number = 1,
) {
  // ۱. بررسی می‌کنیم آیا این کتاب از قبل در سبد خرید کاربر هست یا نه
  const existingStmt = db.prepare(`
    SELECT * FROM cart_items 
    WHERE user_id = ? AND book_id = ?
  `);
  const existing = existingStmt.get(userId, bookId) as
    | { id: number; quantity: number }
    | undefined;

  if (existing) {
    // ۲. اگر از قبل بود، تعداد جدید را به تعداد قبلی اضافه می‌کنیم
    const newQuantity = existing.quantity + quantity;
    const updateStmt = db.prepare(`
      UPDATE cart_items 
      SET quantity = ? 
      WHERE id = ?
    `);
    updateStmt.run(newQuantity, existing.id);

    return { ...existing, quantity: newQuantity };
  } else {
    // ۳. اگر نبود، ردیف جدید با همان تعداد مشخص‌شده ایجاد می‌کنیم
    const insertStmt = db.prepare(`
      INSERT INTO cart_items (user_id, book_id, quantity, created_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `);
    const result = insertStmt.run(userId, bookId, quantity);

    return {
      id: Number(result.lastInsertRowid),
      user_id: userId,
      book_id: bookId,
      quantity,
    };
  }
}

export function updateCartItem(
  userId: number,
  itemId: number,
  quantity: number,
): CartItem {
  const updateStmt = db.prepare(`
    UPDATE cart_items 
    SET quantity = ? 
    WHERE id = ? AND user_id = ?
  `);
  const result = updateStmt.run(quantity, itemId, userId);

  if (result.changes === 0) {
    throw new Error("Cart item not found or unauthorized");
  }

  const itemStmt = db.prepare("SELECT * FROM cart_items WHERE id = ?");
  return itemStmt.get(itemId) as unknown as CartItem;
}

export function deleteCartItem(userId: number, itemId: number): void {
  const deleteStmt = db.prepare(`
    DELETE FROM cart_items 
    WHERE id = ? AND user_id = ?
  `);
  deleteStmt.run(itemId, userId);
}
