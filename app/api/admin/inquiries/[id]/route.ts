import { NextRequest, NextResponse } from "next/server";
import { updateInquiryStatus, Inquiry } from "@/lib/data";
import { getSession } from "@/lib/session";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { status } = await req.json();
  await updateInquiryStatus(params.id, status as Inquiry["status"]);
  return NextResponse.json({ success: true });
}
