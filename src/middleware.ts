import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Normalize path by stripping trailing slash for consistent route matching
  const cleanPath = pathname.endsWith("/") && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

  // 1. Check if token is cryptographically valid
  let session = null;
  if (token) {
    session = await verifySessionToken(token);
  }

  const isLoginRoute = cleanPath === "/admin/login";
  const isAdminUiRoute = cleanPath.startsWith("/admin") && !isLoginRoute;
  const isAdminApiRoute = cleanPath.startsWith("/api/admin") && !cleanPath.startsWith("/api/admin/auth/login");

  // 2. Protect Admin UI Routes: /admin/* (except /admin/login)
  if (isAdminUiRoute) {
    if (!session) {
      const loginUrl = new URL("/admin/login/", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Prevent logged-in admins from accessing /admin/login
  if (isLoginRoute) {
    if (session) {
      return NextResponse.redirect(new URL("/admin/", req.url));
    }
  }

  // 4. Protect Admin API Routes: /api/admin/* (except /api/admin/auth/login)
  if (isAdminApiRoute) {
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Valid administrator session required.",
        },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
