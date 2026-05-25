import { NextRequest, NextResponse } from "next/server";
import { getPropertyById, saveProperty, deleteProperty, generateSlug } from "@/lib/data";
import { getSession } from "@/lib/session";

async function requireAuth() {
  const session = await getSession();
  return session.isLoggedIn === true;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await getPropertyById(params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const updated = {
    ...existing,
    ...body,
    id: existing.id,
    slug: body.slug || existing.slug || generateSlug(body.title || existing.title),
    price: Number(body.price ?? existing.price),
    bedrooms: Number(body.bedrooms ?? existing.bedrooms),
    bathrooms: Number(body.bathrooms ?? existing.bathrooms),
    areaSqft: Number(body.areaSqft ?? existing.areaSqft),
  };

  await saveProperty(updated);
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!await requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await deleteProperty(params.id);
  return NextResponse.json({ success: true });
}
