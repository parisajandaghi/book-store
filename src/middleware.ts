import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { jwtVerify } from "jose";

const secretEnv = process.env.JWT_SECRET;
if (!secretEnv) {
  throw new Error(
    "JWT_SECRET environment variable is not defined in middleware!",
  );
}
const JWT_SECRET_KEY = new TextEncoder().encode(secretEnv);

const intlMiddleware = createMiddleware({
  locales: ["fa", "en"],
  defaultLocale: "fa",
});

const PROTECTED_ROUTES = ["/orders", "/cart", "/profile"];
const GUEST_ROUTES = ["/login", "/signup"];
const ADMIN_ROUTES = ["/admin"];

export default async function middleware(req: NextRequest) {
  // ۱. اجرای میدل‌ور زبان
  const response = intlMiddleware(req);

  const { pathname } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const locale = ["fa", "en"].includes(segments[0]) ? segments[0] : "fa";

  const purePath = ["fa", "en"].includes(segments[0])
    ? `/${segments.slice(1).join("/")}`
    : pathname;

  // ۲. دریافت توکن جدید
  const token = req.cookies.get("auth_token")?.value;
  let isAuthenticated = false;
  let userRole = "USER";

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
      isAuthenticated = true;
      if (payload.role) {
        userRole = payload.role as string;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  const isProtected = PROTECTED_ROUTES.some((route) =>
    purePath.startsWith(route),
  );
  const isGuest = GUEST_ROUTES.some((route) => purePath.startsWith(route));
  const isAdmin = ADMIN_ROUTES.some((route) => purePath.startsWith(route));

  // تابع کمکی برای ساخت ریدایرکت با حفظ کوکی‌ها/هدرهای زبان
  const createRedirectResponse = (url: URL) => {
    const redirectRes = NextResponse.redirect(url);
    // کپی کردن کوکی‌های ست شده توسط next-intl
    response.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie);
    });
    return redirectRes;
  };

  // کاربر لاگین‌نکرده در مسیرهای محافظت‌شده
  if (isProtected && !isAuthenticated) {
    const redirectUrl = new URL(`/${locale}/login`, req.url);
    const redirectRes = createRedirectResponse(redirectUrl);

    // پاک کردن کوکی خراب یا نامعتبر
    redirectRes.cookies.delete({
      name: "auth_token",
      path: "/",
    });
    redirectRes.cookies.delete({
      name: "token",
      path: "/",
    });

    return redirectRes;
  }

  // کاربر لاگین‌کرده در مسیرهای مهمان (مثل لاگین و ثبت‌نام)
  if (isGuest && isAuthenticated) {
    return createRedirectResponse(new URL(`/${locale}`, req.url));
  }

  // بررسی دسترسی ادمین
  if (isAdmin && (!isAuthenticated || userRole !== "ADMIN")) {
    return createRedirectResponse(new URL(`/${locale}`, req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
