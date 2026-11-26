export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  // پاک کردن هر دو کوکی (جدید و قدیمی) از سرور
  cookieStore.delete("auth_token");
  cookieStore.delete("token");

  const response = NextResponse.json({
    message: "Logged out successfully",
  });

  // حذف از ریسپانس برای تضمین پاک شدن در مرورگرهای موبایل و دسکتاپ
  response.cookies.delete("auth_token");
  response.cookies.delete("token");

  // پاکسازی عمیق کش، کوکی‌ها و استوریج سمت مرورگر
  response.headers.set("Clear-Site-Data", '"cache", "cookies", "storage"');
  response.headers.set("Cache-Control", "no-store, max-age=0");

  return response;
}
