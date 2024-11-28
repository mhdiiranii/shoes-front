export const runtime = "nodejs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const data = await req.json();
    const token = data.token;
    if (!token) {
      return NextResponse.json({ valid: false , status : "unauthenticated" }, { status: 404 });
    }

    const user = jwt.verify(token, process.env.AUTH_SECRET);
    if (user) {
      return NextResponse.json({ valid: true,status:"authenticated", user }, { status: 200 });
    }

  } catch (error) {
    return NextResponse.json({ valid: false , status:'unauthenticated'}, { status: 401 })
  }
}
