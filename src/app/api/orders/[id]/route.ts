import { NextRequest, NextResponse } from "next/server";
import { getOrderById } from "@/services/order.service";
import { getCurrentUser } from "@/lib/auth";
import { getErrorMessage } from "@/utils/error";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const resolvedParams = await params;
    const orderId = Number(resolvedParams.id);
    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: "شناسه سفارش نامعتبر است" },
        { status: 400 },
      );
    }

    const orderDetails = getOrderById(orderId, user.id);

    if (!orderDetails) {
      return NextResponse.json(
        { error: "سفارش یافت نشد یا دسترسی ندارید" },
        { status: 404 },
      );
    }

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
