export const runtime = "nodejs";

import clientPromise from "@/app/lib/mongocnct";

export async function GET(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("shoes");
    const url = new URL(req.url);
    const query = new URLSearchParams(url.searchParams);
    if (query.get("brand")) {
      const count = query.get("brand");
      const allItem = await db.collection("products").find({ brand_name: count }).toArray();
      return new Response(JSON.stringify({ status: 200, success: true, data: allItem }));
    } else if (query.get("color")) {
      const count = query.get("color");
      const allItem = await db.collection("products").find({ color: count }).toArray();
      if (allItem.length === 0) {
        return new Response(JSON.stringify({ success: false, status: 404 }));
      }
      return new Response(JSON.stringify({ status: 200, success: true, data: allItem }));
    } else if (query.get("size")) {
      const count = Number(query.get("size"));
      const allItem = await db.collection("products").find({ size_range: count }).toArray();
      if (allItem.length === 0) {
        return new Response(JSON.stringify({ success: false, status: 404 }));
      }
      return new Response(JSON.stringify({ status: 200, success: true, data: allItem }));
    } else if (query.get("gender")) {
      const count = query.get("gender");
      const allItem = await db.collection("products").find({ gender: count }).toArray();
      if (allItem.length === 0) {
        return new Response(JSON.stringify({ success: false, status: 404 }));
      }
      return new Response(JSON.stringify({ status: 200, success: true, data: allItem }));
    } else if (query.get("category")) {
      const count = query.get("category");
      const allItem = await db.collection("products").find({ category: count }).toArray();
      if (allItem.length === 0) {
        return new Response(JSON.stringify({ success: false, status: 404 }));
      }
      return new Response(JSON.stringify({ status: 200, success: true, data: allItem }));
    } else if (query.get("page")) {
      const count = query.get("page");
      const perPage = 12;
      const offset = count - perPage;
      const productCount = await db.collection("products").countDocuments();
      const totalPages = Math.ceil(productCount / perPage);
      const allItem = await db.collection("products").find({}).limit(perPage).skip(offset).toArray();
      if (allItem.length === 0) {
        return new Response(JSON.stringify({ success: false, status: 404 }), { status: 404 });
      }
      return new Response(JSON.stringify({ status: 200, success: true, data: allItem, length: totalPages }), { status: 200 });
    }
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
