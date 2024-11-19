'use server';
import axios from "axios";
import { cookies } from "next/headers";


export async function register(data) {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_END}/user/sign-up`, data);       
        if (res.status === 201) {
            const token = res.data.token;
            cookies().set("access-token", token, {
                httpOnly: true,
                sameSite: 'lax',
            });
            
            return res.data;
        } else {
            console.error('Registration failed:', res.data);
            return res.data; 
        }
    } catch (error) {
        return error.status; 
    }
}


