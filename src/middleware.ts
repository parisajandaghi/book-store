import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const intlMiddleware = createMiddleware({
  locales: ["fa", "en"],
  defaultLocale: "fa",
});

const JWT_SECRET = process.env.JWT_SECRET!;

const secret = new TextEncoder().encode(JWT_SECRET);

const protectedRoutes = ["/orders", "/cart", "/profile"];

const guestRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const segments = pathname.split("/");

  const locale = segments[1];

  const pathWithoutLocale = "/" + segments.slice(2).join("/");

  const token = req.cookies.get("token")?.value;

  let isLoggedIn = false;

  if (token) {
    try {
      await jwtVerify(token, secret);
      isLoggedIn = true;
    } catch {
      isLoggedIn = false;
    }
  }

  const isProtected = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route),
  );

  const isGuest = guestRoutes.some((route) =>
    pathWithoutLocale.startsWith(route),
  );

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if (isGuest && isLoggedIn) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(fa|en)/:path*"],
};
