export const runtime = "nodejs";

import clientPromise from "@/app/lib/mongocnct";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("shoes");
    const users = await db.collection("users").find({}).toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error("MongoDB Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db("shoes");
  try {
    const { username, password } = await req.json();

    const user = await db.collection("users").findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "کاربر پبدا نشد" },{status:404});
    }
    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      return NextResponse.json({ message: "رمز اشنباه است" },{status:401});
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("MongoDB Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
