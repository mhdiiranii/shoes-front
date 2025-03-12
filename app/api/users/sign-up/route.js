export const runtime = "nodejs";
import { signInUser, signUpUser } from "@/app/lib/users";
import bcrypt from "bcryptjs";

export async function POST(req, res) {
  const data = await req.formData();
  const username = data.get("username");
  const password = data.get("password");
  const email = data.get("email");

  try {
    const user = await signInUser();
    const validUser = user.find((item) => item.username === username);
    if (validUser) {
      return new Response(JSON.stringify({ success: false, message: "کاربر وجود دارد" }), {
        status: 401,
      });
    }

    const hashPass = await bcrypt.hash(password, 9);
    await signUpUser({ id: user.length, username: username, email: email, password: hashPass });

    return new Response(JSON.stringify({ success: true, message: "کاربر ساخته شد" }));
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }));
  }
}
