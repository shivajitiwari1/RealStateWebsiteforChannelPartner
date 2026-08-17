import { put, list } from "@vercel/blob";

const PREFIX = "proptech-ncr-kv/";

// No-op: Blob storage needs no initialization
export async function initDB(): Promise<void> {}

export async function dbGet<T>(key: string): Promise<T | null> {
  const { blobs } = await list({ prefix: `${PREFIX}${key}.json` });
  if (blobs.length === 0) return null;
  const res = await fetch(blobs[0].url, { cache: "no-store" });
  if (!res.ok) return null;
  return JSON.parse(await res.text()) as T;
}

export async function dbSet<T>(key: string, value: T): Promise<void> {
  await put(`${PREFIX}${key}.json`, JSON.stringify(value), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
