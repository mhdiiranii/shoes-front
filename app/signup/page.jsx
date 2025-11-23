"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthSchema } from "../models/zod/AuthSchema";
import z from "zod";
import Loading from "../(loading)/loading";

const SignUp = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    };
    try {
      setError("");

      AuthSchema.parse(data);
      const res = await fetch(`/api/users/sign-up`, {
        method: "POST",
        body: formData,
      });
      if (res.status == 401) {
        setError("کاربر وجود دارد");
        setLoading(false);
      } else {
        setError("");
        setLoading(false);
        router.push("login");
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof z.ZodError) {
        const err = error.issues.map((item) => ({
          name: [item.path[0]],
          errors: [item.message],
        }));
        console.log(err[0].errors[0]);
        setError(err[0].errors[0]);
      }
    }
  }

  return (
    <form className="w-full h-screen flex flex-col justify-center items-center " onSubmit={handleSubmit}>
      <p className="p-4 font-bold">Sign Up</p>
      <div className="p-8 shadow-[0_0px_10px_10px_rgba(0,0,0,0.15)] rounded-lg bg-[rgba(241,239,239,0.25)] flex flex-col justify-center items-center gap-10">
        <input name="email" placeholder="email" type="email" required autoComplete="off" className="outline-none rounded-lg text-sm p-2 bg-white shadow-[0_10px_10px_2px_rgba(0,0,0,0.1)] " />
        <input name="username" placeholder="username" type="text" required autoComplete="off" className="outline-none rounded-lg text-sm p-2 bg-white shadow-[0_10px_10px_2px_rgba(0,0,0,0.1)] " />
        <input name="password" type="password" placeholder="password" required autoComplete="off" className="outline-none rounded-lg text-sm p-2 bg-white shadow-[0_10px_10px_2px_rgba(0,0,0,0.1)] " />
        <div className="flex w-full gap-4 justify-center items-center">
          <button id="logIn" className="border-2 font-bold hover:border-slate-200 duration-300 hover:bg-slate-200 px-4 py-2 rounded-lg" type="submit">
            {loading ? (
              <div className="w-full py-1.5 px-1">
                <Loading />
              </div>
            ) : (
              "Sign Up"
            )}
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
