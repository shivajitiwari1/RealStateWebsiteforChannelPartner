import { NextRequest, NextResponse } from "next/server";
import { initDB, dbSet } from "@/lib/db";
import fs from "fs";
import path from "path";

const RESET_TOKEN = "proptech-ncr-reset-2026";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (token !== RESET_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initDB();
    const adminPath = path.join(process.cwd(), "data", "admin.json");
    const admin = JSON.parse(fs.readFileSync(adminPath, "utf-8"));
    await dbSet("admin", admin);
    return NextResponse.json({ success: true, message: "Admin config synced to KV." });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
