import { NextRequest, NextResponse } from "next/server";
import { getAdminConfig, updateAdminConfig } from "@/lib/data";
import { getSession } from "@/lib/session";

async function requireAuth() {
  const session = await getSession();
  return !!session.isLoggedIn;
}

export async function GET() {
  if (!await requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = await getAdminConfig();
  return NextResponse.json({
    brokerName: admin.brokerName,
    phone: admin.phone,
    whatsappNumber: admin.whatsappNumber,
    email: admin.email,
    address: admin.address,
  });
}

export async function PUT(req: NextRequest) {
  if (!await requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const current = await getAdminConfig();
  await updateAdminConfig({
    ...current,
    brokerName: String(body.brokerName || current.brokerName),
    phone: String(body.phone || current.phone),
    whatsappNumber: String(body.whatsappNumber || current.whatsappNumber),
    email: String(body.email || current.email),
    address: String(body.address || current.address),
  });
  return NextResponse.json({ success: true });
}
