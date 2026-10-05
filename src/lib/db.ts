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
              phone TEXT,
              role TEXT DEFAULT 'user',
              created_at TEXT DEFAULT CURRENT_TIMESTAMP
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
              stock INTEGER NOT NULL DEFAULT 0,
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
              address_id INTEGER,
              shipping_method TEXT,
              delivery_date TEXT,
              delivery_time TEXT,
              FOREIGN KEY (user_id) REFERENCES users(id)
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
        {
          name: "reset_tokens",
          schema: `
            CREATE TABLE IF NOT EXISTS reset_tokens (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              email TEXT NOT NULL,
              token TEXT NOT NULL,
              expires_at INTEGER NOT NULL
            );
          `,
        },
        {
          name: "addresses",
          schema: `
            CREATE TABLE IF NOT EXISTS addresses (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL,
              recipientName TEXT NOT NULL,
              phone TEXT NOT NULL,
              address TEXT NOT NULL,
              created_at TEXT DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            );
          `,
        },

        {
          name: "store_settings",
          schema: `
    CREATE TABLE IF NOT EXISTS store_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      store_name TEXT NOT NULL DEFAULT 'Book Store',
      support_email TEXT NOT NULL DEFAULT 'support@bookstore.com',
      phone TEXT DEFAULT '',
      shipping_rate REAL NOT NULL DEFAULT 25000,
      free_shipping_threshold REAL NOT NULL DEFAULT 200000,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
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
      db.exec(`
  INSERT OR IGNORE INTO store_settings (id, store_name, support_email, phone, shipping_rate, free_shipping_threshold)
  VALUES (1, 'کتاب سرا', 'support@bookstore.com', '021-12345678', 35000, 300000);
`);
    };

    createTables();

    // یکدست‌سازی خودکار مقادیر status به حروف کوچک (مانند cancelled)
    try {
      db.exec(
        "ALTER TABLE users ADD COLUMN created_at TEXT DEFAULT CURRENT_TIMESTAMP;",
      );
      console.log("Column 'created_at' added to users table.");
    } catch (error) {
      console.log(
        "Note: Column 'created_at' already exists in users table, skipping.",
      );
    }
    try {
      db.exec(
        "UPDATE orders SET status = LOWER(status) WHERE status IS NOT NULL;",
      );
      console.log("Order statuses normalized to lowercase successfully!");
    } catch (error) {
      console.error("Error normalizing order statuses:", error);
    }

    const makeAdmin = db.prepare(
      `UPDATE users SET role = 'ADMIN' WHERE email = ?`,
    );
    makeAdmin.run("parisajandaghi6831@gmail.com");
    console.log("User updated to ADMIN successfully!");

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
