export const dynamic = "force-dynamic";

import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      const cookieStore = await cookies();
      cookieStore.delete("auth_token"); // پاک کردن کوکی منقضی یا نامعتبر

      const response = NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
      response.cookies.delete("auth_token");
      return response;
    }

    return NextResponse.json(user);
  } catch {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");

    const response = NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
    response.cookies.delete("auth_token");
    return response;
  }
}
