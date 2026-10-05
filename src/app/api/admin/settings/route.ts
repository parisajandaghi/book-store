import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getErrorMessage } from "@/utils/error";
import {
  getStoreSettings,
  updateStoreSettings,
} from "@/services/store-setting.service";

// دریافت اطلاعات توسط ادمین
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "عدم دسترسی" }, { status: 403 });
    }

    const settings = getStoreSettings();
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

// ذخیره اطلاعات
export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "عدم دسترسی" }, { status: 403 });
    }

    const body = await req.json();
    const updated = updateStoreSettings(body);

    return NextResponse.json(
      { message: "تنظیمات با موفقیت ذخیره شد", data: updated },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
