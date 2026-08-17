import { NextResponse } from "next/server";
import { initDB, dbGet } from "@/lib/db";

export async function GET() {
  try {
    await initDB();
    const value = await dbGet<boolean>("maintenance_mode");
    // null means never set → default ON (safe for new installs)
    return NextResponse.json({ maintenance: value ?? true }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ maintenance: true }, {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
