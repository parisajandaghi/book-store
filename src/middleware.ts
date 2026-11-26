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
  const response = intlMiddleware(req);

  const { pathname } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const locale = ["fa", "en"].includes(segments[0]) ? segments[0] : "fa";

  const purePath = ["fa", "en"].includes(segments[0])
    ? `/${segments.slice(1).join("/")}`
    : pathname;

  const token = req.cookies.get("token")?.value;
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

  if (isProtected && !isAuthenticated) {
    const redirectUrl = new URL(`/${locale}/login`, req.url);
    const redirectRes = NextResponse.redirect(redirectUrl);

    if (token) {
      redirectRes.cookies.delete({
        name: "token",
        path: "/",
      });
    }
    return redirectRes;
  }

  if (isGuest && isAuthenticated) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  if (isAdmin && (!isAuthenticated || userRole !== "ADMIN")) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
