"use client"; // اینجا مشخص می‌کنیم که این کامپوننت کلاینتی است

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../(loading)/loading";

const LogIn = () => {
  const [error, setError] = useState(""); // مقدار اولیه خالی
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch(`http://localhost:3000/api/users/sign-in`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      // localStorage.setItem('loged',false)
      setError("رمز عبور یا نام کاربری اشتباه است");
      setLoading(false);
    } else {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("loged", true);
      }

      router.push("/dashboard?page=12");
      setLoading(false);
    }
  }
  return (
    <form className="w-full h-screen flex flex-col justify-center items-center " onSubmit={handleSubmit}>
      <p className="p-4 font-bold">Sign in</p>
      <div className="p-8 shadow-[0_0px_10px_10px_rgba(0,0,0,0.15)] rounded-lg bg-[rgba(241,239,239,0.25)] flex flex-col justify-center items-center gap-10">
        <input name="username" placeholder="username" type="text" required autocomplete="off" className="outline-none rounded-lg text-sm p-2 bg-white shadow-[0_10px_10px_2px_rgba(0,0,0,0.1)] " />
        <input name="password" type="password" placeholder="password" required autocomplete="off" className="outline-none rounded-lg text-sm p-2 bg-white shadow-[0_10px_10px_2px_rgba(0,0,0,0.1)] " />
        <div className="flex w-full gap-4 justify-center items-center">
          <button id="logIn" className="border-2 font-bold hover:border-slate-200 duration-300 hover:bg-slate-200 px-4 py-2 rounded-lg" type="submit">
            {loading ? (
              <div className="w-full py-1.5 px-1">
                <Loading />
              </div>
            ) : (
              "Sign In"
            )}
          </button>
          <Link href={"/signup"} className="border-2 font-bold hover:border-slate-200 duration-300 hover:bg-slate-200 px-4 py-2 rounded-lg" type="submit">
            Sign Up
          </Link>
        </div>
        <p>{error}</p>
      </div>
    </form>
  );
};

export default LogIn;
