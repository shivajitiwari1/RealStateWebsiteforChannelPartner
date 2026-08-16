import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { IronSessionData } from "iron-session";

const MAINTENANCE_MODE = true;

const sessionOptions = {
  password: process.env.SESSION_SECRET || "proptech-ncr-secret-key-min-32-chars-long",
  cookieName: "proptech-ncr-admin",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Maintenance mode: redirect all public traffic to /maintenance
  if (MAINTENANCE_MODE) {
    const isAllowed =
      pathname.startsWith("/maintenance") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/api/admin") ||
      /\.\w+$/.test(pathname);

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/maintenance", request.url));
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
