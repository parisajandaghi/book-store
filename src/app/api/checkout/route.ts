import { NextRequest, NextResponse } from "next/server";
import { checkout } from "@/services/checkout.service";
import { getErrorMessage } from "@/utils/error";
// فرض می‌کنیم تابع زیر را برای دیکد کردن توکن JWT ساخته‌اید
// import { verifyToken } from "@/lib/auth"; 

export async function POST(req: NextRequest) {
  try {

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1]; 

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    
    const user = { id: 1 }; 

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = checkout(user.id);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}
