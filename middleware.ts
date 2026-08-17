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
      const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
      const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
      if (redisUrl && redisToken) {
        const res = await fetch(`${redisUrl}/get/maintenance_mode`, {
          headers: { Authorization: `Bearer ${redisToken}` },
          cache: "no-store",
        });
        const { result } = await res.json();
        const maintenance = result === null ? true : result === "true";
        if (maintenance) {
          return NextResponse.redirect(new URL("/maintenance", request.url));
        }
      }
    } catch {
      // Redis unreachable — allow through
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
