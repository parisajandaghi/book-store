import { NextRequest, NextResponse } from "next/server";
import { getBookById } from "@/services/book.service";
import { getErrorMessage } from "@/utils/error";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const book = getBookById(id);
    return NextResponse.json(book);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 404 },
    );
  }
}
