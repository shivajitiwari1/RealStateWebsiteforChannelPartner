import { NextResponse } from "next/server";
import { redisGet } from "@/lib/redis";

export async function GET() {
  try {
    const value = await redisGet("maintenance_mode");
    const maintenance = value === null ? true : value === "true";
    return NextResponse.json({ maintenance }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ maintenance: true }, { headers: { "Cache-Control": "no-store" } });
  }
}
