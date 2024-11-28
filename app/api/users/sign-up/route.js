export const runtime = "nodejs";

import clientPromise from "@/app/lib/mongocnct";
import bcrypt from "bcryptjs";



export async function POST(req, res) {
  const data = await req.formData();
  const username = data.get("username");
  const password = data.get("password");
  const email = data.get("email");
  const client = await clientPromise;
  const db = client.db("shoes");
  const collection = db.collection("users");
  try {
    const user = await collection.findOne({ username });
    if (user) {
      return new Response(JSON.stringify({ success: false, message: "کاربر وجود دارد" }),{
        status:401,
      });
    }

    const hashPass = await bcrypt.hash(password, 9);
    await collection.insertOne({ username: username, email: email, password: hashPass });

    return new Response(JSON.stringify({ success: true, message: "کاربر ساخته شد" }));
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }));
  }
}
