import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // e.g. protect routes under /dashboard
  if (req.nextUrl.pathname.startsWith("/")) {
    // check if we have a token in cookies
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["//:path*"], 
};
