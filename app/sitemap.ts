import { MetadataRoute } from "next";
import { getAvailableProperties } from "@/lib/data";

const BASE_URL = "https://proptechncr.com";
const CITIES = ["noida", "greater-noida", "gurgaon", "faridabad", "ghaziabad", "delhi"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getAvailableProperties();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/properties`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/new-launches`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${BASE_URL}/cities/${city}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const propertyPages: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${BASE_URL}/properties/${p.slug}`,
    lastModified: new Date(p.postedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...cityPages, ...propertyPages];
}
