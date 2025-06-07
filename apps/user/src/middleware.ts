import { auth } from "@/auth";

export const privateRoutes = ["/dashboard"];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isPrivateRoute = privateRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = req.nextUrl.pathname === "/signin";
  const isAPIRoute = req.nextUrl.pathname.startsWith("/api");

  if (isAPIRoute) return;
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL("/dashboard", req.nextUrl.origin));
  }
  if (isAuthRoute && !isLoggedIn) return;
  if (isPrivateRoute && !isLoggedIn) {
    return Response.redirect(new URL("/signin", req.nextUrl.origin));
  }
});

export const config = {
  matcher: "/((?!_next|_vercel|monitoring|.*\\..*).*)",
};
