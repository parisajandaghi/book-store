import { NextRequest, NextResponse } from "next/server";
import { getProfile, updateProfile } from "@/services/user.service";
import { getErrorMessage } from "@/utils/error";

const getUserId = () => 1;

export function GET() {
  try {
    const userId = getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = getProfile(userId);

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
    const userId = getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const updated = updateProfile(userId, body);

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}
