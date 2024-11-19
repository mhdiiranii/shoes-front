import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      id: "logeIn", // login provider
      name: "logeIn",
      credentials: {
        username: { label: "username" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/user/loge-in`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });
          
          if (!res.ok) {
            throw new Error('نام کاربری یا رمز عبور اشتباه است');
          }

          const user = await res.json();
          return user.data;
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "signUp", // signUp provider
      name: "signUp",
      credentials: {
        username: { label: "username" },
        email: { label: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/user/sign-up`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            throw new Error('ثبت‌نام ناموفق بود');
          }

          const user = await res.json();
          return user.data;
        } catch (error) {
          console.error("Error during sign up:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      session.user.email = token.email;
      return session;
    },
  },
});
