import clientPromise from "@/app/lib/mongocnct";
import { getProduct } from "@/app/lib/myProducts";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("shoes");
    const myData = await getProduct();
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
      // const productCount = await db.collection("products").countDocuments();
      const productCount = myData.length;
      const totalPages = Math.ceil(productCount / perPage);

      const allItem = myData.filter((item) => {
        return (
          (!filter.brand_name || item.brand_name === filter.brand_name) &&
          (!filter.color || item.color === filter.color) &&
          (!filter.size_range || item.size_range === filter.size_range) &&
          (!filter.gender || item.gender === filter.gender) &&
          (!filter.category || item.category === filter.category)
        );
      });

      const paginatedItems = allItem.slice(offset, offset + perPage);

      if (paginatedItems.length === 0) {
        return NextResponse.json({ success: false, status: 404 }, { status: 404 });
      }

      return NextResponse.json({ status: 200, success: true, data: paginatedItems, length: totalPages });
    } else {
      let filterData = null;
      if (filter.brand_name) {
        filterData = myData.filter((item) => item.brand_name == filter.brand_name);
      }
      if (filter.color) {
        filterData = myData.filter((item) => item.color == filter.color);
      }
      if (filter.size_range) {
        filterData = myData.filter((item) => item.size_range == filter.size_range);
      }
      if (filter.gender) {
        filterData = myData.filter((item) => item.gender == filter.gender);
      }
      if (filter.category) {
        filterData = myData.filter((item) => item.category == filter.category);
      }

      if (filterData.length === 0) {
        return NextResponse.json({ success: false }, { status: 404 });
      }
      return NextResponse.json({ status: 200, success: true, data: filterData });
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json({ status: 500, success: false, error: error.message }, { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
