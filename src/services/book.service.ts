import db from "@/lib/db";
import {
  Book,
  Translation,
  CreateBookDTO,
  UpdateBookDTO,
} from "@/features/books/book.type";

export function getBooks(
  page: number = 1,
  limit: number = 10,
  search: string = "",
  sort: string = "most_popular",
  locale?: string,
) {
  const offset = (page - 1) * limit;
  const hasSearch = search.trim().length > 0;
  let orderBy = "books.created_at DESC";

  switch (sort) {
    case "most_popular":
      orderBy = "COALESCE(books.views, 0) DESC, books.created_at DESC";
      break;
    case "most_expensive":
      orderBy = "books.price DESC";
      break;
    case "cheapest":
      orderBy = "books.price ASC";
      break;
    default:
      orderBy = "books.created_at DESC";
  }

  let count: number = 0;
  let booksFromDb: Book[] = [];

  // ۱. اگر زبان مشخص شده باشد (ویترین سایت)
  if (locale) {
    if (hasSearch) {
      const searchTerm = `%${search}%`;
      const countStmt = db.prepare(`
        SELECT COUNT(DISTINCT books.id) as count
        FROM books
        INNER JOIN translations ON books.id = translations.book_id
        WHERE (translations.title LIKE ? OR translations.author LIKE ?)
          AND translations.language_code = ?
      `);
      count = (
        countStmt.get(searchTerm, searchTerm, locale) as { count: number }
      ).count;

      const booksStmt = db.prepare(`
      SELECT DISTINCT books.*
        FROM books
        INNER JOIN translations ON books.id = translations.book_id
        WHERE (translations.title LIKE ? OR translations.author LIKE ?)
          AND translations.language_code = ?
        ORDER BY ${orderBy}
        LIMIT ? OFFSET ?
      `);
      booksFromDb = booksStmt.all(
        searchTerm,
        searchTerm,
        locale,
        limit,
        offset,
      ) as unknown as Book[];
    } else {
      const countStmt = db.prepare(`
        SELECT COUNT(DISTINCT books.id) as count
        FROM books
        INNER JOIN translations ON books.id = translations.book_id
        WHERE translations.language_code = ?
      `);
      count = (countStmt.get(locale) as { count: number }).count;

      const booksStmt = db.prepare(`
        SELECT DISTINCT books.*
        FROM books
        INNER JOIN translations ON books.id = translations.book_id
        WHERE translations.language_code = ?
        ORDER BY ${orderBy}
        LIMIT ? OFFSET ?
      `);
      booksFromDb = booksStmt.all(locale, limit, offset) as unknown as Book[];
    }
  } else {
    // ۲. اگر زبانی مشخص نشده باشد (پنل مدیریت / Admin)
    if (hasSearch) {
      const searchTerm = `%${search}%`;
      const countStmt = db.prepare(`
        SELECT COUNT(DISTINCT books.id) as count
        FROM books
        INNER JOIN translations ON books.id = translations.book_id
        WHERE (translations.title LIKE ? OR translations.author LIKE ?)
      `);
      count = (countStmt.get(searchTerm, searchTerm) as { count: number })
        .count;

      const booksStmt = db.prepare(`
        SELECT DISTINCT books.*
        FROM books
        INNER JOIN translations ON books.id = translations.book_id
        WHERE (translations.title LIKE ? OR translations.author LIKE ?)
        ORDER BY ${orderBy}
        LIMIT ? OFFSET ?
      `);
      booksFromDb = booksStmt.all(
        searchTerm,
        searchTerm,
        limit,
        offset,
      ) as unknown as Book[];
    } else {
      const countStmt = db.prepare("SELECT COUNT(*) as count FROM books");
      count = (countStmt.get() as { count: number }).count;

      const booksStmt = db.prepare(
        `SELECT * FROM books ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
      );
      booksFromDb = booksStmt.all(limit, offset) as unknown as Book[];
    }
  }

  if (booksFromDb.length === 0) {
    return {
      data: [],
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    };
  }

  const bookIds = booksFromDb.map((book) => book.id);
  const placeholders = bookIds.map(() => "?").join(",");

  // ۳. نکته طلایی برای جلوگیری از نشت زبانی:
  // اگر locale داریم، دقیقاً فقط ترجمه‌های همان زبان متصل می‌شوند
  let translations: Translation[];
  if (locale) {
    const translationsStmt = db.prepare(`
      SELECT * FROM translations 
      WHERE book_id IN (${placeholders}) AND language_code = ?
    `);
    translations = translationsStmt.all(
      ...bookIds,
      locale,
    ) as unknown as Translation[];
  } else {
    const translationsStmt = db.prepare(`
      SELECT * FROM translations 
      WHERE book_id IN (${placeholders})
    `);
    translations = translationsStmt.all(...bookIds) as unknown as Translation[];
  }

  const finalBooks = booksFromDb.map((book) => ({
    ...book,
    translations: translations
      .filter((t) => t.book_id === book.id)
      .map((t) => ({ ...t })),
  }));

  return {
    data: finalBooks,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  };
}

type SqliteParams = Record<string, string | number | bigint | null>;

export function createBook(bookData: CreateBookDTO & { stock?: number }): Book {
  const insertBook = db.prepare(`
    INSERT INTO books (price, stock, image_url, views)
    VALUES (@price, @stock, @image_url, 0)
  `);

  const insertTranslation = db.prepare(`
    INSERT INTO translations (book_id, language_code, title, author, description)
    VALUES (@book_id, @language_code, @title, @author, @description)
  `);

  let newBookId: number | bigint = 0;

  db.exec("BEGIN TRANSACTION;");
  try {
    const bookParams: SqliteParams = {
      price: bookData.price,
      stock: bookData.stock ?? 0,
      image_url: bookData.image_url ?? null,
    };

    const info = insertBook.run(bookParams);
    newBookId = info.lastInsertRowid;

    if (bookData.translations && bookData.translations.length > 0) {
      for (const trans of bookData.translations) {
        const lang =
          trans.language_code && trans.language_code.trim() !== ""
            ? trans.language_code
            : "fa";
        const transParams: SqliteParams = {
          book_id: Number(newBookId),
          language_code: lang,
          title: trans.title ?? "",
          author: trans.author ?? null,
          description: trans.description ?? null,
        };
        insertTranslation.run(transParams);
      }
    }
    db.exec("COMMIT;");
  } catch (error) {
    db.exec("ROLLBACK;");
    throw error;
  }

  return getBookById(Number(newBookId));
}

export function updateBook(id: number | string, updates: UpdateBookDTO): Book {
  const numericId = Number(id);
  db.exec("BEGIN TRANSACTION;");
  try {
    const bookKeys = Object.keys(updates).filter(
      (k) => k !== "translations" && k !== "id",
    ) as Array<keyof UpdateBookDTO>;

    if (bookKeys.length > 0) {
      const setString = bookKeys.map((key) => `${key} = @${key}`).join(", ");
      const stmt = db.prepare(`UPDATE books SET ${setString} WHERE id = @id`);

      const updateData = bookKeys.reduce(
        (acc, key) => {
          acc[key] = (updates[key] ?? null) as string | number | null;
          return acc;
        },
        {} as Record<string, string | number | null>,
      );

      stmt.run({ ...updateData, id: numericId });
    }

    if (updates.translations && updates.translations.length > 0) {
      const checkTransStmt = db.prepare(`
        SELECT id FROM translations WHERE book_id = ? AND language_code = ?
      `);

      const updateTransStmt = db.prepare(`
        UPDATE translations 
        SET title = @title, 
            author = @author, 
            description = COALESCE(@description, description)
        WHERE book_id = @book_id AND language_code = @language_code
      `);

      const insertTransStmt = db.prepare(`
        INSERT INTO translations (book_id, language_code, title, author, description)
        VALUES (@book_id, @language_code, @title, @author, @description)
      `);

      for (const trans of updates.translations) {
        if (!trans.language_code) continue;

        const transParams: SqliteParams = {
          book_id: numericId,
          language_code: trans.language_code,
          title: trans.title ?? "",
          author: trans.author ?? "",
          description: trans.description ?? "",
        };

        const existingTrans = checkTransStmt.get(
          numericId,
          trans.language_code,
        );

        if (existingTrans) {
          updateTransStmt.run(transParams);
        } else {
          insertTransStmt.run(transParams);
        }
      }
    }
    db.exec("COMMIT;");
  } catch (error) {
    db.exec("ROLLBACK;");
    throw error;
  }

  return getBookById(numericId);
}

export function deleteBook(id: number | string): void {
  const numericId = Number(id);
  db.exec("BEGIN TRANSACTION;");
  try {
    db.prepare("DELETE FROM translations WHERE book_id = ?").run(numericId);
    db.prepare("DELETE FROM books WHERE id = ?").run(numericId);
    db.exec("COMMIT;");
  } catch (error) {
    db.exec("ROLLBACK;");
    throw error;
  }
}

export function incrementBookViews(id: number | string): void {
  const numericId = Number(id);
  db.prepare(
    `
    UPDATE books 
    SET views = COALESCE(views, 0) + 1 
    WHERE id = ?
  `,
  ).run(numericId);
}

export function getBookById(id: number | string): Book {
  const numericId = Number(id);

  const bookFromDb = db
    .prepare("SELECT * FROM books WHERE id = ?")
    .get(numericId) as unknown as Book | undefined;

  if (!bookFromDb) {
    throw new Error(`Book with id ${numericId} not found`);
  }

  const translationsFromDb = db
    .prepare("SELECT * FROM translations WHERE book_id = ?")
    .all(numericId) as unknown as Translation[];

  return {
    ...bookFromDb,
    translations: translationsFromDb.map((t) => ({ ...t })),
  };
}

export function deductStock(items: { book_id: number; quantity: number }[]) {
  const checkStockStmt = db.prepare("SELECT stock FROM books WHERE id = ?");
  const updateStockStmt = db.prepare(`
    UPDATE books 
    SET stock = stock - ? 
    WHERE id = ? AND stock >= ?
  `);

  db.exec("BEGIN TRANSACTION;");
  try {
    for (const item of items) {
      const book = checkStockStmt.get(item.book_id) as
        | { stock: number }
        | undefined;
      if (!book) {
        throw new Error(`Book ${item.book_id} not found`);
      }
      if (book.stock < item.quantity) {
        throw new Error(`Insufficient stock for book ID: ${item.book_id}`);
      }

      const result = updateStockStmt.run(
        item.quantity,
        item.book_id,
        item.quantity,
      );
      if (result.changes === 0) {
        throw new Error(`Failed to deduct stock for book ID: ${item.book_id}`);
      }
    }
    db.exec("COMMIT;");
  } catch (error) {
    db.exec("ROLLBACK;");
    throw error;
  }
}

export function restockOrderItems(
  items: { book_id: number; quantity: number }[],
) {
  const restockStmt = db.prepare(`
    UPDATE books 
    SET stock = stock + ? 
    WHERE id = ?
  `);

  db.exec("BEGIN TRANSACTION;");
  try {
    for (const item of items) {
      restockStmt.run(item.quantity, item.book_id);
    }
    db.exec("COMMIT;");
  } catch (error) {
    db.exec("ROLLBACK;");
    throw error;
  }
}
