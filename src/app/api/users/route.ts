export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getProfile, updateProfile } from "@/services/user.service";
import { getErrorMessage } from "@/utils/error";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers"; // اضافه شد

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      // حذف کوکی از سمت سرور
      (await cookies()).delete("auth_token");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = getProfile(user.id);
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      // حذف کوکی از سمت سرور
      (await cookies()).delete("auth_token");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const updated = await updateProfile(user.id, body);

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}
