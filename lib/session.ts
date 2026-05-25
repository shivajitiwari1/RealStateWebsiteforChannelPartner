import { getIronSession, IronSessionData } from "iron-session";
import { cookies } from "next/headers";

declare module "iron-session" {
  interface IronSessionData {
    isLoggedIn?: boolean;
    username?: string;
  }
}

const sessionOptions = {
  password: process.env.SESSION_SECRET || "proptech-ncr-secret-key-min-32-chars-long",
  cookieName: "proptech-ncr-admin",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 hours
  },
};

export async function getSession() {
  const session = await getIronSession<IronSessionData>(
    await cookies(),
    sessionOptions
  );
  return session;
}
