export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/error";
import { getStoreSettings } from "@/services/store-setting.service";

// دریافت تنظیمات عمومی برای سبد خرید و کاربران عادی
export async function GET() {
  try {
    const settings = getStoreSettings();

    // فقط اطلاعاتی که کاربر عادی نیاز دارد برگردانده می‌شود
    return NextResponse.json(
      {
        store_name: settings.store_name,
        shipping_rate: settings.shipping_rate,
        free_shipping_threshold: settings.free_shipping_threshold,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
