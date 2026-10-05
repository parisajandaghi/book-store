import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

import { getErrorMessage } from "@/utils/error";
import { updateUserByAdmin } from "@/services/admin-user.service";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "عدم دسترسی" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    const updated = updateUserByAdmin(Number(id), body);
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}

export { PUT as PATCH };
