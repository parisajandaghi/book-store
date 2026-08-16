import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(
  request: Request,
  // در نکست‌جی‌اس ۱۵ params یک Promise است
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // ۱. استخراج params با استفاده از await
    const resolvedParams = await params;
    
    const orderId = parseInt(resolvedParams.id, 10);
    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: "شناسه سفارش نامعتبر است" },
        { status: 400 },
      );
    }

    const user = await getCurrentUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { error: "شما وارد حساب کاربری نشده‌اید (Unauthorized)" },
        { status: 401 },
      );
    }

    const stmt = db.prepare(`
      UPDATE orders 
      SET status = 'cancelled' 
      WHERE id = ? 
        AND status = 'pending' 
        AND user_id = ? 
    `);

    const info = stmt.run(orderId, Number(user.id));

    if (info.changes === 0) {
      return NextResponse.json(
        {
          error:
            "سفارش پیدا نشد، در وضعیت 'در حال بررسی' نیست، یا متعلق به شما نمی‌باشد.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "سفارش با موفقیت لغو شد" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Cancel order error:", error);
    return NextResponse.json(
      { error: "خطای داخلی سرور در لغو سفارش" },
      { status: 500 },
    );
  }
}
