// Upstash Redis REST helper — works in both Edge and Node.js runtimes

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

function headers() {
  return { Authorization: `Bearer ${REDIS_TOKEN}` };
}

export async function redisGet(key: string): Promise<string | null> {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  const res = await fetch(`${REDIS_URL}/get/${key}`, {
    headers: headers(),
    cache: "no-store",
  });
  const data = await res.json();
  return data.result ?? null;
}

export async function redisSet(key: string, value: string): Promise<void> {
  if (!REDIS_URL || !REDIS_TOKEN) throw new Error("Upstash Redis not configured");
  await fetch(`${REDIS_URL}/set/${key}/${encodeURIComponent(value)}`, {
    method: "POST",
    headers: headers(),
    cache: "no-store",
  });
}
