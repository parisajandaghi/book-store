import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

import { getErrorMessage } from "@/utils/error";
import { getAllUsers } from "@/services/admin-user.service";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "عدم دسترسی" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";

    const result = getAllUsers({ page, limit, search, role });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
