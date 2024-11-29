"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import validator from "validator";

const SignUp = () => {
  const [error, setError] = useState(""); // مقدار اولیه خالی
  const router = useRouter();
  
  const isValidEmail  = (email) => validator.isEmail(email);
  const validateUsername = (username) => /^[a-zA-Z0-9_]{3,20}$/.test(username);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    if(!isValidEmail(email)){
      setError("!ایمیل درست قرار دهید")
      return null;
    }
    if(!validateUsername(username)){
      setError('نام کاربری درست انتخاب کنید!')
      return null;
    }
    if(!validatePassword(password)){
      setError("رمز عبور را درست کنید")
      return null;
    }
    try {
      setError("");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/users/sign-up`, {
        method: "POST",
        body: formData,
      });
      if (res.status == 401) {
        setError("کاربر وجود دارد");
      } else {
        setError("");
        router.push("login");
      }
    } catch (error) {
      console.log("خطا در ورود:", error);
    }
  }

  return (
    <form className="w-full h-screen flex flex-col justify-center items-center " onSubmit={handleSubmit}>
      <p className="p-4 font-bold">Sign Up</p>
      <div className="p-8 shadow-[0_0px_10px_10px_rgba(0,0,0,0.15)] rounded-lg bg-[rgba(241,239,239,0.25)] flex flex-col justify-center items-center gap-10">
        <input name="email" placeholder="email" type="email" required autocomplete="off" className="outline-none rounded-lg text-sm p-2 bg-white shadow-[0_10px_10px_2px_rgba(0,0,0,0.1)] " />
        <input name="username" placeholder="username" type="text" required autocomplete="off" className="outline-none rounded-lg text-sm p-2 bg-white shadow-[0_10px_10px_2px_rgba(0,0,0,0.1)] " />
        <input name="password" type="password" placeholder="password" required autocomplete="off" className="outline-none rounded-lg text-sm p-2 bg-white shadow-[0_10px_10px_2px_rgba(0,0,0,0.1)] " />
        <div className="flex w-full gap-4 justify-center items-center">
          <button id="logIn" className="border-2 font-bold hover:border-slate-200 duration-300 hover:bg-slate-200 px-4 py-2 rounded-lg" type="submit">
            Sign Up
          </button>
          <Link href={"/login"} className="border-2 font-bold hover:border-slate-200 duration-300 hover:bg-slate-200 px-4 py-2 rounded-lg" type="submit">
            Sign in
          </Link>
        </div>
        <p>{error}</p>
      </div>
    </form>
  );
};

export default SignUp;
