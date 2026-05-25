import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import fs from "fs";
import path from "path";
import { getSession } from "@/lib/session";

const DATA_DIR = path.join(process.cwd(), "data");

export async function POST() {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const properties = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "properties.json"), "utf-8"));
    const inquiries = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "inquiries.json"), "utf-8"));
    const admin = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "admin.json"), "utf-8"));

    await kv.set("properties", properties);
    await kv.set("inquiries", inquiries);
    await kv.set("admin", admin);

    return NextResponse.json({ success: true, message: "KV seeded with existing data." });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
