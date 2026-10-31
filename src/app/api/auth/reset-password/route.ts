export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "توکن و رمز عبور جدید الزامی است" },
        { status: 400 },
      );
    }

    const resetRecord = db
      .prepare("SELECT * FROM reset_tokens WHERE token = ?")
      .get(token) as { email: string; expires_at: number } | undefined;

    if (!resetRecord || resetRecord.expires_at < Date.now()) {
      return NextResponse.json(
        { error: "لینک بازیابی نامعتبر است یا منقضی شده" },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(newPassword);

    db.prepare("UPDATE users SET password = ? WHERE email = ?").run(
      hashedPassword,
      resetRecord.email,
    );

    db.prepare("DELETE FROM reset_tokens WHERE email = ?").run(
      resetRecord.email,
    );

    return NextResponse.json(
      { message: "رمز عبور با موفقیت تغییر کرد" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
