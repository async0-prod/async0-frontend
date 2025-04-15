import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthConfig, Session } from "next-auth";
import type { Provider } from "next-auth/providers";

export interface session extends Session {
  user: {
    id: string;
    name: string;
    email: string;
    accesstoken: string;
    role: string;
  };
}

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

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const authOptions: NextAuthConfig = {
  providers,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.foo = "bar";
        token.accessToken = account.access_token;
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/user/signin`;
          console.log(account.access_token);
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${account.id_token}`,
            },
          });

          if (response.ok) {
            console.log("User registered successfully");
            const userData = await response.json();
            token.userId = userData.id;
            token.role = userData.role;
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
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export async function isAuthenticated() {
  const session = await auth();
  return !!session?.user;
}
