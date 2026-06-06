import db from "@/lib/db";

export function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const book = db.prepare(`
    SELECT * FROM books WHERE id = ?
  `).get(id);

  if (!book) {
    return Response.json(
      { error: "Book not found" },
      { status: 404 }
    );
  }

  return Response.json(book);
}