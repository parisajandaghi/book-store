// src/app/api/uploads/[filename]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { UploadService } from "@/services/upload.service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;
  const fileData = await UploadService.getFile(filename);

  if (!fileData) {
    return NextResponse.json({ error: "تصویر یافت نشد" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(fileData.buffer), {
    status: 200,
    headers: {
      "Content-Type": fileData.contentType,
      "Cache-Control": "public, max-age=2592000, immutable",
    },
  });
}
