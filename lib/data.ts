import { Redis } from "@upstash/redis";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export interface Property {
  id: string;
  title: string;
  slug: string;
  type: "residential" | "commercial" | "new-launch" | "plot";
  city: "noida" | "greater-noida" | "gurgaon" | "faridabad" | "ghaziabad" | "delhi";
  area: string;
  price: number;
  priceLabel: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  description: string;
  images: string[];
  featured: boolean;
  status: "available" | "sold" | "rented";
  postedAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  propertyId: string | null;
  source: "homepage" | "contact" | "property-page" | "new-launches";
  status: "new" | "contacted" | "closed";
  submittedAt: string;
}

export interface AdminConfig {
  username: string;
  passwordHash: string;
  whatsappNumber: string;
  brokerName: string;
  email: string;
  address: string;
  phone: string;
}

// Supports Upstash env vars (UPSTASH_REDIS_REST_URL) or old Vercel KV vars (KV_REST_API_URL)
function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function readFile<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

async function readData<T>(key: string, fallbackFile: string): Promise<T> {
  const redis = getRedis();
  if (redis) {
    try {
      const data = await redis.get<T>(key);
      if (data !== null && data !== undefined) return data;
    } catch {
      // Redis not reachable — fall through to file
    }
  }
  return readFile<T>(fallbackFile);
}

async function writeData<T>(key: string, data: T): Promise<void> {
  const redis = getRedis();
  if (!redis) {
    throw new Error(
      "Redis storage not configured. Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to Vercel environment variables."
    );
  }
  await redis.set(key, data);
}

// Properties
export async function getProperties(): Promise<Property[]> {
  return readData<Property[]>("properties", "properties.json");
}

export async function getAvailableProperties(): Promise<Property[]> {
  return (await getProperties()).filter((p) => p.status === "available");
}

export async function getFeaturedProperties(): Promise<Property[]> {
  return (await getAvailableProperties()).filter((p) => p.featured);
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  return (await getProperties()).find((p) => p.slug === slug);
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  return (await getProperties()).find((p) => p.id === id);
}

export async function getPropertiesByCity(city: string): Promise<Property[]> {
  return (await getAvailableProperties()).filter((p) => p.city === city);
}

export async function getPropertiesByType(type: string): Promise<Property[]> {
  return (await getAvailableProperties()).filter((p) => p.type === type);
}

export async function saveProperty(property: Property): Promise<void> {
  const properties = await getProperties();
  const index = properties.findIndex((p) => p.id === property.id);
  if (index >= 0) properties[index] = property;
  else properties.push(property);
  await writeData("properties", properties);
}

export async function deleteProperty(id: string): Promise<void> {
  const properties = (await getProperties()).filter((p) => p.id !== id);
  await writeData("properties", properties);
}

// Inquiries
export async function getInquiries(): Promise<Inquiry[]> {
  return readData<Inquiry[]>("inquiries", "inquiries.json");
}

export async function saveInquiry(inquiry: Inquiry): Promise<void> {
  const inquiries = await getInquiries();
  inquiries.unshift(inquiry);
  await writeData("inquiries", inquiries);
}

export async function updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<void> {
  const inquiries = await getInquiries();
  const index = inquiries.findIndex((i) => i.id === id);
  if (index >= 0) {
    inquiries[index].status = status;
    await writeData("inquiries", inquiries);
  }
}

// Admin
export async function getAdminConfig(): Promise<AdminConfig> {
  return readData<AdminConfig>("admin", "admin.json");
}

export async function updateAdminConfig(config: AdminConfig): Promise<void> {
  await writeData("admin", config);
}

// Slug generation
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
