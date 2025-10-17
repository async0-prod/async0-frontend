import { NextRequest, NextResponse } from "next/server";
import { env } from "next-runtime-env";

export const privateRoutes = ["/dashboard"];
export const redirectRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const isPrivateRoute = privateRoutes.includes(request.nextUrl.pathname);
  const isRedirectRoute = redirectRoutes.includes(request.nextUrl.pathname);

  if (isRedirectRoute) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  if (isPrivateRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    try {
      const resp = await fetch(`${env("NEXT_PUBLIC_BACKEND_URL")}/auth/user`, {
        headers: {
          Cookie: `async0_session=${session.value}`,
          Origin: env("NEXT_PUBLIC_ORIGIN")!,
        },
      });
      if (!resp.ok) {
        console.error("resp.ok is false");
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));
      }
    } catch (error) {
      console.error("Error checking user session:", error);
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|_vercel|monitoring|.*\\..*).*)",
};
