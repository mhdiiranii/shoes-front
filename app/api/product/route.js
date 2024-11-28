import clientPromise from "@/app/lib/mongocnct";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("shoes");
    const query = req.nextUrl.searchParams; // استفاده از query params به جای request.url
    let filter = {};

    if (query.get("brand")) {
      filter.brand_name = query.get("brand");
    } else if (query.get("color")) {
      filter.color = query.get("color");
    } else if (query.get("size")) {
      filter.size_range = Number(query.get("size"));
    } else if (query.get("gender")) {
      filter.gender = query.get("gender");
    } else if (query.get("category")) {
      filter.category = query.get("category");
    }

    if (query.get("page")) {
      const page = Number(query.get("page"));
      const perPage = 12;
      const offset = (page - 1) * perPage;
      const productCount = await db.collection("products").countDocuments();
      const totalPages = Math.ceil(productCount / perPage);

      const allItem = await db.collection("products")
        .find(filter)
        .limit(perPage)
        .skip(offset)
        .toArray();

      if (allItem.length === 0) {
        return NextResponse.json({ success: false, status: 404 }, { status: 404 });
      }

      return NextResponse.json({ status: 200, success: true, data: allItem, length: totalPages });
    } else {
      const allItem = await db.collection("products").find(filter).toArray();
      if (allItem.length === 0) {
        return NextResponse.json({ success: false }, { status: 404 });
      }
      return NextResponse.json({ status: 200, success: true, data: allItem });
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { status: 500, success: false, error: error.message },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
