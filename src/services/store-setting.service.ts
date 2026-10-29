import db from "@/lib/db";

export interface StoreSettings {
  id: number;
  store_name: string;
  support_email: string;
  phone: string;
  shipping_rate: number;
  free_shipping_threshold: number;
  updated_at?: string;
}

export type UpdateStoreSettingsDTO = Partial<
  Omit<StoreSettings, "id" | "updated_at">
>;

// دریافت تنظیمات (برای ادمین و همچنین بخش کاربری/سبد خرید)
export function getStoreSettings(): StoreSettings {
  const statement = db.prepare(
    `SELECT * FROM store_settings WHERE id = 1 LIMIT 1`,
  );
  const settings = statement.get() as StoreSettings | undefined;

  if (!settings) {
    // در صورتی که دیتابیس تازه ساخته شده باشد و ردیف 1 نبود
    db.exec(`
      INSERT OR IGNORE INTO store_settings (id, store_name, support_email, phone, shipping_rate, free_shipping_threshold)
      VALUES (1, 'bookstore', 'support@bookstore.com', '', 35000, 300000);
    `);
    return db
      .prepare(`SELECT * FROM store_settings WHERE id = 1`)
      .get() as unknown as StoreSettings;
  }

  return settings;
}

// ذخیره و به‌روزرسانی تنظیمات توسط ادمین
export function updateStoreSettings(
  data: UpdateStoreSettingsDTO,
): StoreSettings {
  const current = getStoreSettings();

  const newSettings = {
    store_name:
      data.store_name !== undefined ? data.store_name : current.store_name,
    support_email:
      data.support_email !== undefined
        ? data.support_email
        : current.support_email,
    phone: data.phone !== undefined ? data.phone : current.phone,
    shipping_rate:
      data.shipping_rate !== undefined
        ? Number(data.shipping_rate)
        : current.shipping_rate,
    free_shipping_threshold:
      data.free_shipping_threshold !== undefined
        ? Number(data.free_shipping_threshold)
        : current.free_shipping_threshold,
  };

  const statement = db.prepare(`
    UPDATE store_settings
    SET 
      store_name = ?,
      support_email = ?,
      phone = ?,
      shipping_rate = ?,
      free_shipping_threshold = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `);

  statement.run(
    newSettings.store_name,
    newSettings.support_email,
    newSettings.phone,
    newSettings.shipping_rate,
    newSettings.free_shipping_threshold,
  );

  return getStoreSettings();
}
