export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/services/user.service";
import { getErrorMessage } from "@/utils/error";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Name, email and password are required.",
        },
        {
          status: 400,
        },
      );
    }

    const existingUser = getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email already exists.",
        },
        {
          status: 409,
        },
      );
    }

    const user = await createUser({
      name,
      email,
      password,
      phone,
    });

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: getErrorMessage(error),
      },
      {
        status: 500,
      },
    );
  }
}
