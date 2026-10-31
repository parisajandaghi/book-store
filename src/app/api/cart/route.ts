export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
} from "@/services/cart.service";
import { getBookById } from "@/services/book.service";
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
      { status: 401 }, // در کد خودتان 401 بود، نگه داشتم
    );
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bookId, quantity = 1 } = await req.json();

  if (!bookId) {
    return NextResponse.json({ error: "bookId is required" }, { status: 400 });
  }

  try {
    // ۱. دریافت اطلاعات کتاب برای بررسی موجودی
    const book = getBookById(Number(bookId));

    // ۲. بررسی تعداد فعلی این کتاب در سبد خرید کاربر
    const cart = getCart(user.id);
    const existingItem = cart.find((item) => item.book_id === Number(bookId));
    const currentQuantityInCart = existingItem ? existingItem.quantity : 0;

    // ۳. محاسبه تعداد کل درخواستی (موجودی داخل سبد + تعداد جدید)
    const totalRequestedQuantity = currentQuantityInCart + Number(quantity);

    // ۴. مقایسه با موجودی انبار
    if (totalRequestedQuantity > (book.stock || 0)) {
      return NextResponse.json(
        { error: "تعداد درخواستی بیش از موجودی انبار است." },
        { status: 400 },
      );
    }

    // ۵. در صورتی که موجودی کافی بود، به سبد اضافه شود
    const result = await addToCart(user.id, Number(bookId), Number(quantity));
    return NextResponse.json(result);
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

    // ۱. پیدا کردن آیتم در سبد خرید تا متوجه شویم مربوط به کدام کتاب است
    const cart = getCart(user.id);
    const cartItem = cart.find((item) => item.id === Number(itemId));

    if (!cartItem) {
      return NextResponse.json(
        { error: "آیتم در سبد خرید یافت نشد" },
        { status: 404 },
      );
    }

    // ۲. گرفتن اطلاعات کتاب برای بررسی موجودی
    const book = getBookById(cartItem.book_id);

    // ۳. مقایسه تعداد درخواستی با موجودی کتاب در دیتابیس
    if (quantity > (book.stock || 0)) {
      return NextResponse.json(
        { error: "تعداد درخواستی بیش از موجودی انبار است" },
        { status: 400 },
      );
    }

    // ۴. اعمال تغییرات
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

    deleteCartItem(user.id, Number(itemId));
    return NextResponse.json({ message: "Item removed" });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}
