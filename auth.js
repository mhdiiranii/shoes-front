import NextAuth from "next-auth";
import Credentials  from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "username" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch('/api/users/mongo-db', {
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
          return user;
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    })
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.username = user.username;
  //       token.email = user.email;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user.username = token.username;
  //     session.user.email = token.email;
  //     return session;
  //   },
  // },
});
