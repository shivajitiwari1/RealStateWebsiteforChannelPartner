import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { IronSessionData } from "iron-session";

const sessionOptions = {
  password: process.env.SESSION_SECRET || "proptech-ncr-secret-key-min-32-chars-long",
  cookieName: "proptech-ncr-admin",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that always pass through without maintenance check
  const isPassthrough =
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/maintenance-status") ||
    /\.\w+$/.test(pathname);

  if (!isPassthrough) {
    try {
      const statusUrl = new URL("/api/maintenance-status", request.url);
      const res = await fetch(statusUrl.toString(), { cache: "no-store" });
      if (res.ok) {
        const { maintenance } = await res.json();
        if (maintenance) {
          return NextResponse.redirect(new URL("/maintenance", request.url));
        }
      }
    } catch {
      // DB unreachable — allow through rather than block visitors
    }
  }

  // Admin auth guard
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const response = NextResponse.next();
    const session = await getIronSession<IronSessionData>(request, response, sessionOptions);

    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
