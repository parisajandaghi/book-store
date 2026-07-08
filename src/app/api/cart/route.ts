import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
} from "@/services/cart.service";
import { getErrorMessage } from "@/utils/error";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const cart = getCart(user.id);

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 401 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();

    console.log("BODY =", body);

    const { bookId } = body as { bookId: string | number };

    console.log("bookId =", bookId);

    if (!bookId) {
      return NextResponse.json(
        { error: "bookId is required" },
        { status: 400 },
      );
    }

    // تبدیل به عدد
    const item = addToCart(user.id, Number(bookId));
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
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { itemId, quantity } = (await req.json()) as {
      itemId: string | number;
      quantity: number;
    };

    if (!itemId || quantity < 1) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // تبدیل به عدد
    const updated = updateCartItem(user.id, Number(itemId), quantity);
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
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("id");

    if (!itemId) {
      return NextResponse.json(
        { error: "Item id is required" },
        { status: 400 },
      );
    }

    // تبدیل به عدد
    deleteCartItem(user.id, Number(itemId));
    return NextResponse.json({ message: "Item removed" });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}
