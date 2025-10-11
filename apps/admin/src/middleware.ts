import { NextRequest, NextResponse } from "next/server";

export const privateRoutes = ["/problems"];

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("admin_session");
  const isPrivateRoute = privateRoutes.includes(request.nextUrl.pathname);

  if (isPrivateRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/admin`,
        {
          headers: {
            Cookie: `admin_session=${session.value}`,
            Origin: process.env.NEXT_PUBLIC_ADMIN_ORIGIN!,
          },
        }
      );

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
