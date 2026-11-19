// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { UploadService } from "@/services/upload.service";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "فایلی ارسال نشده است" },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "تنها ارسال فایل تصویر مجاز است" },
        { status: 400 },
      );
    }

    const fileUrl = await UploadService.saveFile(file);

    return NextResponse.json({ url: fileUrl }, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "خطای ناشناخته در آپلود فایل";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
