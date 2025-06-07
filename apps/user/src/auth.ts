import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
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
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/user/signin`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${account.id_token}`,
            },
          });

          if (response.ok) {
            console.log("User registered successfully");
            const userData = (await response.json()) as {
              id: string;
              email: string;
              role: string;
              server_access_token: string;
            };

            token.foo = "bar";
            token.userId = userData.id;
            token.role = userData.role;
            token.accessToken = userData.server_access_token;
          }
        } catch (error) {
          console.error("Failed to register user with backend:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        foo: token.foo,
        accessToken: token.accessToken,
        userId: token.userId,
        role: token.role,
      };
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

// export async function isAuthenticated() {
//   const session = await auth();
//   return !!session?.user;
// }
