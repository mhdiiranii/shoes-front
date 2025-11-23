"use server";

import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("user-token");
  const routes = ["/login", "/signup"];

  if (token && routes.includes(request.nextUrl.pathname)) {

    return NextResponse.redirect(new URL("/", request.url));

  }

  if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup") {

    return NextResponse.next();

  }

  if (!token) {

    return NextResponse.redirect(new URL("/login", request.url));

  }

  return NextResponse.next();

}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|css|js)|$).*)"],
};
