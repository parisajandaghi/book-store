// app/api/admin/orders/route.ts
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

import { getErrorMessage } from "@/utils/error";
import { adminOrderService } from "@/services/admin-order.service";

export async function GET() {
  try {
    // ۱. اعتبارسنجی کاربر
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - لطفا وارد حساب کاربری خود شوید." },
        { status: 401 },
      );
    }

    // ۲. بررسی سطح دسترسی
    if (user.role.toUpperCase() !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - دسترسی فقط برای مدیران امکان‌پذیر است." },
        { status: 403 },
      );
    }

    // ۳. دریافت داده‌ها از لایه سرویس
    const orders = adminOrderService.getAllOrders();

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
