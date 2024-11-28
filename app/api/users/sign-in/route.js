export const runtime = "nodejs";

import clientPromise from "@/app/lib/mongocnct";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db("shoes");
  const cookieStore = cookies();
  try {
    const data = await req.formData();
    const username = data.get("username");
    const password = data.get("password");
  
    const user = await db.collection("users").findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "کاربر پبدا نشد" }, { status: 404 });
    }
    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      return NextResponse.json({ message: "رمز اشنباه است" }, { status: 401 });
    }
      
      const token = jwt.sign({ username:username,email:user.email }, process.env.AUTH_SECRET, { expiresIn: '1h' });
      cookieStore.set({name:'user-token',value:token})
    return NextResponse.json({ user, token });
  } catch (error) {
    console.error("MongoDB Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
