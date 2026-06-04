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
) {
  const offset = (page - 1) * limit;

  const hasSearch = search.trim().length > 0;

  let count: number;
  let booksFromDb: Book[];

  if (hasSearch) {
    const searchTerm = `%${search}%`;

    const countStmt = db.prepare(`
      SELECT COUNT(DISTINCT books.id) as count
      FROM books
      INNER JOIN translations
      ON books.id = translations.book_id
      WHERE translations.title LIKE ?
      OR translations.author LIKE ?
    `);

    const countResult = countStmt.get(searchTerm, searchTerm) as {
      count: number;
    };

    count = countResult.count;

    const booksStmt = db.prepare(`
      SELECT DISTINCT books.*
      FROM books
      INNER JOIN translations
      ON books.id = translations.book_id
      WHERE translations.title LIKE ?
      OR translations.author LIKE ?
      ORDER BY books.created_at DESC
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

    const countResult = countStmt.get() as {
      count: number;
    };

    count = countResult.count;

    const booksStmt = db.prepare(`
      SELECT *
      FROM books
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `);

    booksFromDb = booksStmt.all(limit, offset) as unknown as Book[];
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

  const translationsStmt = db.prepare(`
    SELECT *
    FROM translations
    WHERE book_id IN (${placeholders})
  `);

  const translations = translationsStmt.all(
    ...bookIds,
  ) as unknown as Translation[];

  const finalBooks = booksFromDb.map((book) => {
  const bookTranslations = translations
    .filter((t) => t.book_id === book.id)
    .map((t) => ({ ...t }));

  return {
    ...book,
    translations: bookTranslations,
  };
});

  return {
    data: finalBooks,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  };
}

type SqliteParams = Record<string, string | number | bigint | null>;

export function createBook(bookData: CreateBookDTO): Book {
  const insertBook = db.prepare(`
    INSERT INTO books (price, image_url)
    VALUES (@price, @image_url)
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
      image_url: bookData.image_url ?? null,
    };

    const info = insertBook.run(bookParams);
    newBookId = info.lastInsertRowid;

    if (bookData.translations && bookData.translations.length > 0) {
      for (const trans of bookData.translations) {
        const transParams: SqliteParams = {
          book_id: Number(newBookId),
          language_code: trans.language_code,
          title: trans.title,
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
      (k) => k !== "translations",
    ) as Array<keyof UpdateBookDTO>;

    if (bookKeys.length > 0) {
      const setString = bookKeys.map((key) => `${key} = @${key}`).join(", ");
      const stmt = db.prepare(`UPDATE books SET ${setString} WHERE id = @id`);

      const updateData = bookKeys.reduce(
        (acc, key) => {
          acc[key] = updates[key] as string | number;
          return acc;
        },
        {} as Record<string, string | number>,
      );

      stmt.run({ ...updateData, id: numericId });
    }

    if (updates.translations && updates.translations.length > 0) {
      const updateTransStmt = db.prepare(`
        UPDATE translations 
        SET language_code = COALESCE(@language_code, language_code), 
            title = COALESCE(@title, title), 
            author = COALESCE(@author, author), 
            description = COALESCE(@description, description)
        WHERE id = @id AND book_id = @book_id
      `);

      const insertTransStmt = db.prepare(`
        INSERT INTO translations (book_id, language_code, title, author, description)
        VALUES (@book_id, @language_code, @title, @author, @description)
      `);

      for (const trans of updates.translations) {
        if (trans.id) {
          const updateTransParams: SqliteParams = {
            id: trans.id,
            book_id: numericId,
            language_code: trans.language_code ?? null,
            title: trans.title ?? null,
            author: trans.author ?? null,
            description: trans.description ?? null,
          };
          updateTransStmt.run(updateTransParams);
        } else {
          const insertTransParams: SqliteParams = {
            book_id: numericId,
            language_code: trans.language_code ?? null,
            title: trans.title ?? null,
            author: trans.author ?? null,
            description: trans.description ?? null,
          };
          insertTransStmt.run(insertTransParams);
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

  // ✅✅✅ راه‌حل: یک آبجکت کاملاً جدید و ساده بسازید
  const finalBook = {
    ...bookFromDb, // آبجکت کتاب را به Plain Object تبدیل می‌کند
    translations: translationsFromDb.map((t) => ({ ...t })), // آرایه ترجمه‌ها را به آرایه‌ای از Plain Objects تبدیل می‌کند
  };

  return finalBook;
}
