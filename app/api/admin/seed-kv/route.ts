import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import fs from "fs";
import path from "path";
import { getSession } from "@/lib/session";

const DATA_DIR = path.join(process.cwd(), "data");

export async function POST() {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return NextResponse.json(
      { error: "Redis not configured. Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to Vercel env vars." },
      { status: 503 }
    );
  }

  try {
    const redis = new Redis({ url, token });
    const properties = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "properties.json"), "utf-8"));
    const inquiries = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "inquiries.json"), "utf-8"));
    const admin = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "admin.json"), "utf-8"));

    await redis.set("properties", properties);
    await redis.set("inquiries", inquiries);
    await redis.set("admin", admin);

    return NextResponse.json({ success: true, message: "Redis seeded with existing data." });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
