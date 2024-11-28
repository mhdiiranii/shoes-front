export const runtime = "nodejs";

import clientPromise from "@/app/lib/mongocnct";



export async function GET(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("shoes");
    const allItem = await db.collection("products").find({}, {projection:{ category: 1, color: 1, brand_name: 1 }}).toArray();
    return new Response(JSON.stringify({ status: 200, success: true, data: allItem }));
  } catch (error) {
    console.error("Error fetching items:", error);
    return (
      new Response(JSON.stringify({ status: 500, success: false, error: error.message })),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
