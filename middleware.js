
"use server"

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function middleware(req) {
  
const authentication = await auth()

if(!authentication){
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl)
}

  return NextResponse.next();
}

// این خط به شما کمک می‌کند تا فقط مسیرهای خاصی را هدف قرار دهید
export const config = {
  // runtime: 'nodejs',
  matcher: ['/dashboard/:path*','/profile/:path'], // مسیرهای محافظت شده
};