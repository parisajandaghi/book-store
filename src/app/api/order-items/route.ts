import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/error";
import {
  getOrderItems,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from "@/services/order-item.service";

export function GET() {
  try {
    const items = getOrderItems();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // در بدنه درخواست باید order_id و book_id به درستی ارسال شوند
    const item = createOrderItem({
      order_id: Number(body.order_id),
      book_id: Number(body.book_id),
      quantity: Number(body.quantity),
      price: Number(body.price),
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "شناسه آیتم سفارش (id) الزامی است" },
        { status: 400 },
      );
    }

    const updated = updateOrderItem(Number(id), updates);
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}

export function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "شناسه آیتم سفارش (id) الزامی است" },
        { status: 400 },
      );
    }

    deleteOrderItem(Number(id));
    return NextResponse.json(
      { message: "آیتم سفارش با موفقیت حذف شد" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}
