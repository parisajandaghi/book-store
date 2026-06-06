import db from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
   const { id } = await params;
console.log("VIEW API HIT:", id);
  db.prepare(`
    UPDATE books
    SET views = views + 1
    WHERE id = ?
  `).run(id);

  return Response.json({ success: true });
}