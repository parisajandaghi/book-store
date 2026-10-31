export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { adminOrderService } from "@/services/admin-order.service";
import { getCurrentUser } from "@/lib/auth";
import { getErrorMessage } from "@/utils/error";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized access - Admin only" },
        { status: 403 },
      );
    }

    const resolvedParams = await params;
    const orderId = Number(resolvedParams.id);

    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: "شناسه سفارش نامعتبر است" },
        { status: 400 },
      );
    }

    const orderDetails = adminOrderService.getAdminOrderById(orderId);

    if (!orderDetails) {
      return NextResponse.json({ error: "سفارش یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized access - Admin only" },
        { status: 403 },
      );
    }

    const resolvedParams = await params;
    const orderId = Number(resolvedParams.id);

    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: "شناسه سفارش نامعتبر است" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const { status, tracking_code } = body;

    // فراخوانی متد به‌روزرسانی در سرویس
    const updatedOrder = adminOrderService.updateOrder(orderId, {
      status,
      tracking_code,
    });

    if (!updatedOrder) {
      return NextResponse.json({ error: "سفارش یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
