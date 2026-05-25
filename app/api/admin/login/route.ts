import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminConfig } from "@/lib/data";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const admin = getAdminConfig();

    if (username !== admin.username) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!admin.passwordHash) {
      return NextResponse.json({ error: "Admin password not set. Run: npm run seed" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const session = await getSession();
    session.isLoggedIn = true;
    session.username = admin.username;
    await session.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
