import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { jwtVerify } from "jose";

const intlMiddleware = createMiddleware({
  locales: ["fa", "en"],
  defaultLocale: "fa",
});

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_jwt_secret_key"
);

const PROTECTED_ROUTES = ["/orders", "/cart", "/profile"];
const GUEST_ROUTES = ["/login", "/signup"];
const ADMIN_ROUTES = ["/admin"];

export default async function middleware(req: NextRequest) {
  // ۱. اجرای میدل‌ور زبان
  const response = intlMiddleware(req);

  const { pathname } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const locale = ["fa", "en"].includes(segments[0]) ? segments[0] : "fa";

  // استخراج مسیر بدون پیشوند زبان
  const purePath = ["fa", "en"].includes(segments[0])
    ? `/${segments.slice(1).join("/")}`
    : pathname;

  // ۲. اعتبارسنجی JWT
  const token = req.cookies.get("token")?.value;
  let isAuthenticated = false;
  let userRole = "USER";

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      isAuthenticated = true;
      if (payload.role) {
        userRole = payload.role as string;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  // ۳. بررسی نوع مسیر
  const isProtected = PROTECTED_ROUTES.some((route) => purePath.startsWith(route));
  const isGuest = GUEST_ROUTES.some((route) => purePath.startsWith(route));
  const isAdmin = ADMIN_ROUTES.some((route) => purePath.startsWith(route));

  // ۴. هدایت و پاکسازی کوکی در صورت عدم دسترسی

  // مسیرهای محافظت‌شده بدون لاگین معتبر
  if (isProtected && !isAuthenticated) {
    const redirectRes = NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    if (token) redirectRes.cookies.delete("token");
    return redirectRes;
  }

  // مسیرهای مهمان برای کاربر لاگین‌شده
  if (isGuest && isAuthenticated) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // مسیرهای ادمین برای کاربران غیرادمین
  if (isAdmin && (!isAuthenticated || userRole !== "ADMIN")) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  return response;
}

export const config = {
  // فیلتر کردن فایل‌های استاتیک، تصاویر، آیکون‌ها و API
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
