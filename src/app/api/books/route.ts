export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "@/services/book.service";
import { getErrorMessage } from "@/utils/error";

export function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") ?? "";
    const sort = searchParams.get("sort") || "most_popular";
    // دریافت زبان از ریکوئست فرانت (اختیاری)
    const locale = searchParams.get("locale") || undefined;

    const result = getBooks(page, limit, search, sort, locale);

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const book = createBook(body);

    return NextResponse.json(book, { status: 201 });
  } catch (error: unknown) {
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
        { error: "Book id is required" },
        { status: 400 },
      );
    }

    const updated = updateBook(id, updates);

    return NextResponse.json(updated, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}

export function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Book id is required" },
        { status: 400 },
      );
    }

    deleteBook(id);

    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }
}
