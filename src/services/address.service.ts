import db from "@/lib/db";

export interface Address {
  id: number;
  userId: number;
  recipientName: string;
  phone: string;
  address: string;
}

export function getUserAddresses(userId: number): Address[] {
  const stmt = db.prepare(`
    SELECT id, user_id as userId, recipientName, phone, address 
    FROM addresses 
    WHERE user_id = ?
    ORDER BY created_at DESC
  `);

  return stmt.all(userId) as unknown as Address[];
}

export function createAddress(
  userId: number,
  data: Omit<Address, "id" | "userId">,
): Address {
  const stmt = db.prepare(`
    INSERT INTO addresses (user_id, recipientName, phone, address)
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(userId, data.recipientName, data.phone, data.address);

  return {
    id: Number(result.lastInsertRowid),
    userId,
    recipientName: data.recipientName,
    phone: data.phone,
    address: data.address,
  };
}
export function updateAddress(
  id: number,
  userId: number,
  data: Omit<Address, "id" | "userId">,
): boolean {
  const stmt = db.prepare(`
    UPDATE addresses 
    SET recipientName = ?, phone = ?, address = ?
    WHERE id = ? AND user_id = ?
  `);

  const info = stmt.run(data.recipientName, data.phone, data.address, id, userId);
  
  // اگر رکوردی آپدیت شده باشد changes بزرگتر از 0 خواهد بود
  return info.changes > 0; 
}

export function deleteAddress(id: number, userId: number): boolean {
  const stmt = db.prepare(`
    DELETE FROM addresses 
    WHERE id = ? AND user_id = ?
  `);

  const info = stmt.run(id, userId);
  
  return info.changes > 0;
}