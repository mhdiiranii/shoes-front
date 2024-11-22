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
      return Response.json({ status: 200, success: true, data: allItem });
    } else if (query.get("color")) {
      const count = query.get("color");
      const allItem = await db.collection("products").find({ color: count }).toArray();
      if (allItem.length === 0) {
        return Response.json({ success: false, status: 404 });
      }
      return Response.json({ status: 200, success: true, data: allItem });
    } else if (query.get("size")) {
      const count = Number(query.get("size"));
      const allItem = await db.collection("products").find({ size_range: count }).toArray();
      if (allItem.length === 0) {
        return Response.json({ success: false, status: 404 });
      }
      return Response.json({ status: 200, success: true, data: allItem });
    } else if (query.get("gender")) {
      const count = query.get("gender");
      const allItem = await db.collection("products").find({ gender: count }).toArray();
      if (allItem.length === 0) {
        return Response.json({ success: false, status: 404 });
      }
      return Response.json({ status: 200, success: true, data: allItem });
    } else if (query.get("category")) {
      const count = query.get("category");
      const allItem = await db.collection("products").find({ category: count }).toArray();
      if (allItem.length === 0) {
        return Response.json({ success: false, status: 404 });
      }
      return Response.json({ status: 200, success: true, data: allItem });
    } else {
      const allItem = await db.collection("products").find().toArray();
      return Response.json({ status: 200, success: true, data: allItem });
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    return (
      Response.json({ status: 500, success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
