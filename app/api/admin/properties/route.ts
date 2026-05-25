import { NextRequest, NextResponse } from "next/server";
import { getProperties, saveProperty, Property, generateSlug } from "@/lib/data";
import { getSession } from "@/lib/session";

async function requireAuth() {
  const session = await getSession();
  if (!session.isLoggedIn) return false;
  return true;
}

export async function GET() {
  if (!await requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getProperties());
}

export async function POST(req: NextRequest) {
  if (!await requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const property: Property = {
    id: `prop-${Date.now()}`,
    title: body.title,
    slug: body.slug || generateSlug(body.title),
    type: body.type,
    city: body.city,
    area: body.area || "",
    price: Number(body.price) || 0,
    priceLabel: body.priceLabel || "",
    bedrooms: Number(body.bedrooms) || 0,
    bathrooms: Number(body.bathrooms) || 0,
    areaSqft: Number(body.areaSqft) || 0,
    description: body.description || "",
    images: body.images || [],
    featured: Boolean(body.featured),
    status: body.status || "available",
    postedAt: new Date().toISOString().split("T")[0],
  };

  saveProperty(property);
  return NextResponse.json({ success: true, id: property.id });
}
