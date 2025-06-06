import { DefaultSession } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";

declare module "next-auth" {
  // Extend session to hold the access_token
  interface Session {
    foo: string & DefaultSession;
    accessToken: string & DefaultSession;
    userId: string & DefaultSession;
    role: string & DefaultSession;
  }

  // Extend token to hold the access_token before it gets put into session
  interface JWT {
    foo: string & DefaultJWT;
    userId: string & DefaultJWT;
    role: string & DefaultJWT;
    accessToken: string & DefaultJWT;
  }
}
