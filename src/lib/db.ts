import { DatabaseSync } from "node:sqlite";
import path from "path";

declare global {
  var __db: DatabaseSync | undefined;
}

const dbPath = path.join(process.cwd(), "data", "bookstore.db");
let db: DatabaseSync;

if (!global.__db) {
  try {
    db = new DatabaseSync(dbPath);
    console.log(`Successfully connected to SQLite database at: ${dbPath}`);

    db.exec("PRAGMA journal_mode = WAL;");
    db.exec("PRAGMA foreign_keys = ON;");

    const createTables = () => {
      const tables = [
        {
          name: "users",
          schema: `
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              email TEXT NOT NULL UNIQUE,
              password TEXT NOT NULL, 
              role TEXT DEFAULT 'user'
            );
          `,
        },
        {
          name: "books",
          schema: `
            CREATE TABLE IF NOT EXISTS books (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              price REAL NOT NULL,
              image_url TEXT NOT NULL,
              created_at TEXT DEFAULT CURRENT_TIMESTAMP,
              views INTEGER DEFAULT 0
            );
          `,
        },
        {
          name: "cart_items",
          schema: `
            CREATE TABLE IF NOT EXISTS cart_items (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL,
              book_id INTEGER NOT NULL,
              quantity INTEGER NOT NULL DEFAULT 1,
              created_at TEXT DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users (id),
              FOREIGN KEY (book_id) REFERENCES books (id)
            );
          `,
        },
        {
          name: "translations",
          schema: `
            CREATE TABLE IF NOT EXISTS translations (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              book_id INTEGER NOT NULL,
              language_code TEXT NOT NULL,
              title TEXT NOT NULL,
              author TEXT NOT NULL,
              description TEXT NOT NULL,
              FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE
            );
          `,
        },
        {
          name: "orders",
          schema: `
           CREATE TABLE IF NOT EXISTS orders (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           user_id INTEGER NOT NULL,
  
 
           subtotal REAL NOT NULL,
           shipping_fee REAL DEFAULT 0,
           total REAL NOT NULL,
  
  
           recipient_name TEXT,
           phone TEXT,
           address TEXT,
           tracking_code TEXT,
  
           status TEXT DEFAULT 'pending',
           created_at TEXT DEFAULT CURRENT_TIMESTAMP,
           FOREIGN KEY (user_id) REFERENCES users (id)
);

          `,
        },
        {
          name: "order_items",
          schema: `
            CREATE TABLE IF NOT EXISTS order_items (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              order_id INTEGER NOT NULL,
              book_id INTEGER NOT NULL,
              quantity INTEGER NOT NULL,
              price REAL NOT NULL,
              FOREIGN KEY (order_id) REFERENCES orders (id),
              FOREIGN KEY (book_id) REFERENCES books (id)
            );
          `,
        },
      ];

      tables.forEach((table) => {
        try {
          db.exec(table.schema);
          console.log(`Table "${table.name}" created or already exists.`);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          console.error(`Error creating table "${table.name}":`, errorMessage);
          throw new Error(
            `Failed to create table "${table.name}": ${errorMessage}`,
          );
        }
      });
    };

    createTables();

    global.__db = db;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      `Error connecting to SQLite database at ${dbPath}:`,
      errorMessage,
    );
    throw new Error(`Failed to initialize database: ${errorMessage}`);
  }
} else {
  db = global.__db;
}

export default db;
