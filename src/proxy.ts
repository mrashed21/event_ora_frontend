import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/about", "/contact", "/events"];
const AUTH_ROUTES = ["/auth/login", "/auth/register"];

type JwtPayload = {
  user_role?: "user" | "admin" | "super_admin";
  exp?: number;
};

function getUserRoleFromToken(token?: string): JwtPayload["user_role"] | null {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload)) as JwtPayload;
    return decoded.user_role || null;
  } catch (error) {
    return null;
  }
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const userRole = getUserRoleFromToken(accessToken);

  const isAdminRoute = pathname.startsWith("/admin");
  const isUserRoute = pathname.startsWith("/user");
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  const isPublicRoute =
    PUBLIC_ROUTES.includes(pathname) ||
    pathname.startsWith("/events/") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api");

  //  Public routes always allowed
  if (isPublicRoute) {
    return NextResponse.next();
  }

  //  Not logged in → block protected routes
  if (!accessToken) {
    if (isAdminRoute || isUserRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  // Logged in user should not go to login/register again
  if (isAuthRoute) {
    if (userRole === "admin" || userRole === "super_admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (userRole === "user") {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
  }

  //  USER cannot access /admin/**
  if (isAdminRoute && userRole !== "admin" && userRole !== "super_admin") {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  //  ADMIN / SUPER_ADMIN cannot access /user/**
  if (isUserRoute && userRole !== "user") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)",
  ],
};
