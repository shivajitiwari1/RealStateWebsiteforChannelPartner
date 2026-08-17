import { NextResponse } from "next/server";
import { initDB, dbSet } from "@/lib/db";
import fs from "fs";
import path from "path";
import { getSession } from "@/lib/session";

const DATA_DIR = path.join(process.cwd(), "data");

export async function POST() {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await initDB();
    const properties = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "properties.json"), "utf-8"));
    const inquiries = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "inquiries.json"), "utf-8"));
    const admin = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "admin.json"), "utf-8"));

    await dbSet("properties", properties);
    await dbSet("inquiries", inquiries);
    await dbSet("admin", admin);

    return NextResponse.json({ success: true, message: "MySQL seeded with existing data." });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
