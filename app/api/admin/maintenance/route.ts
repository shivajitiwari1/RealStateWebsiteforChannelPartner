import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { initDB, dbGet, dbSet } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await initDB();
    const value = await dbGet<boolean>("maintenance_mode");
    return NextResponse.json({ maintenance: value ?? true });
  } catch {
    return NextResponse.json({ maintenance: true });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { maintenance } = await req.json();
  await initDB();
  await dbSet("maintenance_mode", maintenance);
  return NextResponse.json({ success: true, maintenance });
}
