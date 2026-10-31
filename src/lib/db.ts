import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";

declare global {
  var __db: DatabaseSync | undefined;
  var __dbInitialized: boolean | undefined;
}

const dbPath = path.join(process.cwd(), "data", "bookstore.db");

function getDbInstance(): DatabaseSync {
  if (!global.__db) {
    try {
      // اطمینان از وجود پوشه data
      const dataDir = path.dirname(dbPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const instance = new DatabaseSync(dbPath);
      console.log(`Successfully connected to SQLite database at: ${dbPath}`);

      instance.exec("PRAGMA journal_mode = WAL;");
      instance.exec("PRAGMA busy_timeout = 10000;");
      instance.exec("PRAGMA foreign_keys = ON;");

      if (!global.__dbInitialized) {
        initDatabase(instance);
        global.__dbInitialized = true;
      }

      global.__db = instance;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(
        `Error connecting to SQLite database at ${dbPath}:`,
        errorMessage
      );
      throw new Error(`Failed to initialize database: ${errorMessage}`);
    }
  }

  return global.__db;
}

function initDatabase(instance: DatabaseSync) {
  instance.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL, 
      phone TEXT,
      role TEXT DEFAULT 'user',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      price REAL NOT NULL,
      image_url TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      views INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      book_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (book_id) REFERENCES books (id)
    );

    CREATE TABLE IF NOT EXISTS translations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id INTEGER NOT NULL,
      language_code TEXT NOT NULL,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      description TEXT NOT NULL,
      FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE
    );

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

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      book_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders (id),
      FOREIGN KEY (book_id) REFERENCES books (id)
    );

    CREATE TABLE IF NOT EXISTS reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      token TEXT NOT NULL,
      expires_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      recipientName TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS store_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      store_name TEXT NOT NULL DEFAULT 'Book Store',
      support_email TEXT NOT NULL DEFAULT 'support@bookstore.com',
      phone TEXT DEFAULT '',
      shipping_rate REAL NOT NULL DEFAULT 25000,
      free_shipping_threshold REAL NOT NULL DEFAULT 200000,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    INSERT OR IGNORE INTO store_settings (id, store_name, support_email, phone, shipping_rate, free_shipping_threshold)
    VALUES (1, 'کتاب سرا', 'support@bookstore.com', '021-12345678', 35000, 300000);
  `);

  try {
    const makeAdmin = instance.prepare(
      `UPDATE users SET role = 'ADMIN' WHERE email = ?`
    );
    makeAdmin.run("parisajandaghi6831@gmail.com");
  } catch {
    // نادیده گرفتن در صورت نبود کاربر
  }
}

// استفاده از Proxy برای Lazy Loading واقعی دیتابیس
const db = new Proxy({} as DatabaseSync, {
  get(_target, prop) {
    const realDb = getDbInstance();
    const value = Reflect.get(realDb, prop);
    if (typeof value === "function") {
      return value.bind(realDb);
    }
    return value;
  },
});

export default db;
