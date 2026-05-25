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
  matcher: ["/admin/:path*"],
};
