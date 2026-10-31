export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import crypto from "crypto";
import db from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "ایمیل الزامی است" }, { status: 400 });
    }

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (!user) {
      return NextResponse.json(
        { message: "اگر ایمیل معتبر باشد، لینک بازیابی ارسال شد." },
        { status: 200 },
      );
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 3600000;

    db.prepare(
      "INSERT INTO reset_tokens (email, token, expires_at) VALUES (?, ?, ?)",
    ).run(email, token, expiresAt);

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/en/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"پشتیبانی فروشگاه" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "درخواست بازیابی رمز عبور",
      html: `
        <div style="font-family: Tahoma, Arial, sans-serif; direction: rtl; text-align: right; padding: 20px;">
          <h2>بازیابی رمز عبور</h2>
          <p>شما درخواست بازیابی رمز عبور برای حساب کاربری خود داده‌اید. برای تعیین رمز عبور جدید روی دکمه زیر کلیک کنید:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #228be6; color: #fff; text-decoration: none; border-radius: 5px;">تغییر رمز عبور</a>
          <p style="color: #666; font-size: 14px;">این لینک تا ۱ ساعت دیگر معتبر است.</p>
          <p style="color: #666; font-size: 14px;">اگر شما این درخواست را نداده‌اید، این ایمیل را نادیده بگیرید.</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "لینک بازیابی به ایمیل شما ارسال شد." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { error: "خطای سرور در ارسال ایمیل" },
      { status: 500 },
    );
  }
}
