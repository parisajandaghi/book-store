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
