import { NextRequest, NextResponse } from "next/server";
import { checkout } from "@/services/checkout.service";
import { CheckoutRequest } from "@/features/carts/cart.type";
import { getErrorMessage } from "@/utils/error";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    /**
     * بعداً از JWT استخراج می‌شود
     */
    const user = {
      id: 1,
    };

    const checkoutData: CheckoutRequest = await req.json();

    const result = checkout(user.id, checkoutData);

    return NextResponse.json(result, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: getErrorMessage(error),
      },
      {
        status: 400,
      },
    );
  }
}