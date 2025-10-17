import { NextRequest, NextResponse } from "next/server";
import { env } from "next-runtime-env";

export const privateRoutes = ["/problems"];

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("async0_admin_session");
  const isPrivateRoute = privateRoutes.includes(request.nextUrl.pathname);

  if (isPrivateRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    try {
      const resp = await fetch(`${env("NEXT_PUBLIC_BACKEND_URL")}/auth/admin`, {
        headers: {
          Cookie: `async0_admin_session=${session.value}`,
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
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
