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

function readJSON<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as T;
}

function writeJSON<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Properties
export function getProperties(): Property[] {
  return readJSON<Property[]>("properties.json");
}

export function getAvailableProperties(): Property[] {
  return getProperties().filter((p) => p.status === "available");
}

export function getFeaturedProperties(): Property[] {
  return getAvailableProperties().filter((p) => p.featured);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return getProperties().find((p) => p.slug === slug);
}

export function getPropertyById(id: string): Property | undefined {
  return getProperties().find((p) => p.id === id);
}

export function getPropertiesByCity(city: string): Property[] {
  return getAvailableProperties().filter((p) => p.city === city);
}

export function getPropertiesByType(type: string): Property[] {
  return getAvailableProperties().filter((p) => p.type === type);
}

export function saveProperty(property: Property): void {
  const properties = getProperties();
  const index = properties.findIndex((p) => p.id === property.id);
  if (index >= 0) {
    properties[index] = property;
  } else {
    properties.push(property);
  }
  writeJSON("properties.json", properties);
}

export function deleteProperty(id: string): void {
  const properties = getProperties().filter((p) => p.id !== id);
  writeJSON("properties.json", properties);
}

// Inquiries
export function getInquiries(): Inquiry[] {
  return readJSON<Inquiry[]>("inquiries.json");
}

export function saveInquiry(inquiry: Inquiry): void {
  const inquiries = getInquiries();
  inquiries.unshift(inquiry);
  writeJSON("inquiries.json", inquiries);
}

export function updateInquiryStatus(id: string, status: Inquiry["status"]): void {
  const inquiries = getInquiries();
  const index = inquiries.findIndex((i) => i.id === id);
  if (index >= 0) {
    inquiries[index].status = status;
    writeJSON("inquiries.json", inquiries);
  }
}

// Admin
export function getAdminConfig(): AdminConfig {
  return readJSON<AdminConfig>("admin.json");
}

export function updateAdminConfig(config: AdminConfig): void {
  writeJSON("admin.json", config);
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
