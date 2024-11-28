"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function SignOut(params) {
    const cookieStore = cookies();
    cookieStore.delete('user-token')
    redirect('/login')
}