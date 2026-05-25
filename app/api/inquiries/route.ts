import { NextRequest, NextResponse } from "next/server";
import { saveInquiry, Inquiry } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message, propertyId, source, city } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const inquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : "",
      message: message ? String(message).trim() : "",
      propertyId: propertyId || null,
      source: source || "homepage",
      status: "new",
      submittedAt: new Date().toISOString(),
    };

    if (city) {
      inquiry.message = inquiry.message ? `City: ${city}\n${inquiry.message}` : `City: ${city}`;
    }

    await saveInquiry(inquiry);
    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (err) {
    console.error("Inquiry error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
