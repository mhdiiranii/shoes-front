export const runtime = "nodejs";

import clientPromise from "@/app/lib/mongocnct";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("shoes");
    const allItem = await db.collection("products").find({}, {projection:{ category: 1, color: 1, brand_name: 1 }}).toArray();
    return NextResponse.json({ status: 200, success: true, data: allItem });
  } catch (error) {
    console.error("Error fetching items:", error);
    return (
      NextResponse.json({ status: 500, success: false, error: error.message },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    );
  }
}
