import { NextResponse } from "next/server";
import { initDB, dbGet } from "@/lib/db";

export async function GET() {
  try {
    await initDB();
    const value = await dbGet<boolean>("maintenance_mode");
    const maintenance = value === null ? true : Boolean(value);
    return NextResponse.json({ maintenance }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ maintenance: true }, { headers: { "Cache-Control": "no-store" } });
  }
}
