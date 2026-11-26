export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/services/user.service";
import { verifyPassword } from "@/lib/auth";
import { getErrorMessage } from "@/utils/error";
import { createToken } from "@/lib/auth";
import { cookies } from "next/headers";
import db from "@/lib/db";

const ADMIN_EMAIL = "parisajandaghi6831@gmail.com";

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

    if (!user || !user.password) {
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

    // اگر ایمیل ادمین است و هنوز در دیتابیس نقش ADMIN نگرفته، همان‌جا آپدیت شود
    if (
      user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      user.role !== "ADMIN"
    ) {
      try {
        db.prepare("UPDATE users SET role = 'ADMIN' WHERE id = ?").run(user.id);
        user.role = "ADMIN";
      } catch (err) {
        console.error("Failed to promote user to ADMIN:", err);
      }
    }

    const assignedRole =
      user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
        ? "ADMIN"
        : user.role || "user";

    const token = await createToken({
      id: user.id,
      email: user.email,
      role: assignedRole,
    });

    const { password: _, ...safeUser } = {
      ...user,
      role: assignedRole,
    };

    const cookieStore = await cookies();

    cookieStore.set({
      name: "auth_token",
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
