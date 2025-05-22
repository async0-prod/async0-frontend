import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Google({
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    },
  }),
];

export const authOptions: NextAuthConfig = {
  providers,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/signin`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${account.id_token}`,
            },
          });

          if (response.ok) {
            console.log("Admin verified successfully");
            const adminData = await response.json();
            token.foo = "bar";
            token.userId = adminData.id;
            token.role = adminData.role;
            token.accessToken = adminData.server_access_token;
          }
        } catch (error) {
          console.error("Failed to register user with backend:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, foo: token.foo, accessToken: token.accessToken };
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
