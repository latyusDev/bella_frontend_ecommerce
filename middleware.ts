import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/checkout", "/cart/checkout"];
const guestOnlyRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isGuestOnly = guestOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isGuestOnly && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/cart/checkout/:path*",
    "/login",
    "/register",
  ],
};