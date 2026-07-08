import { NextRequest, NextResponse } from "next/server";
import { checkout } from "@/services/checkout.service";
import { CheckoutRequest } from "@/features/carts/cart.type";
import { getErrorMessage } from "@/utils/error";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
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
