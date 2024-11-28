export const runtime = "nodejs";

import clientPromise from "@/app/lib/mongocnct";



export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("shoes");

    const allItem = await db.collection("products").findOne({ slug: params.slug });

    if (allItem.length === 0) {
      return new Response(JSON.stringify({ success: false, status: 404, message: "No items found" }), { status: 404, headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ status: 200, success: true, data: allItem }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error fetching items:", error);

    return new Response(JSON.stringify({ status: 500, success: false, error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
