import { NextRequest, NextResponse } from "next/server";
import {
  getOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder,
} from "@/services/order.service";
import { getErrorMessage } from "@/utils/error";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const orders = getOrdersByUserId(user.id);
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { subtotal, shipping_fee, recipient_name, phone, address } = body;

    // تبدیل به عدد و محاسبه جمع کل
    const numSubtotal = Number(subtotal);
    const numShippingFee = Number(shipping_fee);

    if (isNaN(numSubtotal) || isNaN(numShippingFee)) {
      return NextResponse.json(
        { error: "Invalid price values" },
        { status: 400 },
      );
    }

    const total = numSubtotal + numShippingFee;

    // پاس دادن تمام دیتاهای لازم به سرویس
    const order = createOrder(
      user.id,
      numSubtotal,
      numShippingFee,
      total,
      recipient_name,
      phone,
      address,
    );

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Order id is required" },
        { status: 400 },
      );
    }

    const updated = updateOrder(Number(id), user.id, updates);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Order id is required" },
        { status: 400 },
      );
    }

    deleteOrder(Number(id), user.id);
    return NextResponse.json({ message: "Order deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}
