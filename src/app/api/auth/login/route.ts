import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/services/user.service";
import { verifyPassword } from "@/lib/auth";
import { getErrorMessage } from "@/utils/error";
import { createToken } from "@/lib/auth";
import { cookies } from "next/headers";
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required.",
        },
        {
          status: 400,
        },
      );
    }

    const user = getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid email or password.",
        },
        {
          status: 401,
        },
      );
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        {
          error: "Invalid email or password.",
        },
        {
          status: 401,
        },
      );
    }
    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role!,
    });
    const { password: _, ...safeUser } = user;

    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(safeUser);
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
