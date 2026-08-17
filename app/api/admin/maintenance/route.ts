import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { redisGet, redisSet } from "@/lib/redis";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const value = await redisGet("maintenance_mode");
    const maintenance = value === null ? true : value === "true";
    return NextResponse.json({ maintenance });
  } catch {
    return NextResponse.json({ maintenance: true });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { maintenance } = await req.json();
    await redisSet("maintenance_mode", String(maintenance));
    return NextResponse.json({ success: true, maintenance });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
