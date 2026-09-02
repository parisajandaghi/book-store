// src/app/api/orders/[id]/cancel/route.ts
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { cancelOrder } from "@/services/order.service";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
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

    // اجرای منطق لغو سفارش + بازگشت موجودی در تراکنش امن
    cancelOrder(orderId, Number(user.id));

    return NextResponse.json(
      { message: "سفارش با موفقیت لغو شد و موجودی به انبار بازگشت" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Cancel order error:", error);

    // بررسی نوع خطا برای دسترسی امن به message
    const errorMessage =
      error instanceof Error ? error.message : "خطای داخلی سرور در لغو سفارش";

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
