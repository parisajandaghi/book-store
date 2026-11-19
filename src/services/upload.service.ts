// src/services/upload.service.ts
import path from "path";
import fs from "fs/promises";
import fsSync from "fs";
import crypto from "crypto";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export class UploadService {
  private static getUploadDir(): string {
    const uploadDir =
      process.env.NODE_ENV === "production"
        ? path.join("/app/data", "uploads")
        : path.join(process.cwd(), "data", "uploads");

    if (!fsSync.existsSync(uploadDir)) {
      fsSync.mkdirSync(uploadDir, { recursive: true });
    }

    return uploadDir;
  }

  // ذخیره تصویر جدید
  static async saveFile(file: File): Promise<string> {
    const ext = path.extname(file.name) || ".jpg";
    const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
    const uploadDir = this.getUploadDir();
    const filePath = path.join(uploadDir, uniqueName);

    const bytes = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(bytes));

    return `/api/uploads/${uniqueName}`;
  }

  // خواندن تصویر برای سرو کردن
  static async getFile(filename: string): Promise<{ buffer: Buffer; contentType: string } | null> {
    try {
      const safeFilename = path.basename(filename);
      const uploadDir = this.getUploadDir();
      const filePath = path.join(uploadDir, safeFilename);

      const buffer = await fs.readFile(filePath);
      const ext = path.extname(safeFilename).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";

      return { buffer, contentType };
    } catch {
      return null;
    }
  }

  // حذف تصویر در صورت نیاز (مثلاً هنگام ویرایش یا حذف کتاب)
  static async deleteFile(fileUrl: string): Promise<boolean> {
    try {
      if (!fileUrl.startsWith("/api/uploads/")) return false;
      const filename = path.basename(fileUrl);
      const filePath = path.join(this.getUploadDir(), filename);
      await fs.unlink(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
