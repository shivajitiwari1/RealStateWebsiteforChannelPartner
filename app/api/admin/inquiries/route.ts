import { NextResponse } from "next/server";
import { getInquiries } from "@/lib/data";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getInquiries());
}
