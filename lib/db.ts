import mysql from "mysql2/promise";

function getConfig(): mysql.ConnectionOptions {
  const url = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL || process.env.DATABASE_URL;
  if (url) {
    const parsed = new URL(url);
    return {
      host: parsed.hostname,
      port: Number(parsed.port) || 3306,
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.slice(1),
      ssl: { rejectUnauthorized: false },
      connectTimeout: 10000,
    };
  }
  return {
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
    user: process.env.MYSQLUSER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQLDATABASE || process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    connectTimeout: 10000,
  };
}

async function withDB<T>(fn: (conn: mysql.Connection) => Promise<T>): Promise<T> {
  const conn = await mysql.createConnection(getConfig());
  try {
    return await fn(conn);
  } finally {
    await conn.end().catch(() => {});
  }
}

export async function initDB(): Promise<void> {
  await withDB((conn) =>
    conn.execute(`
      CREATE TABLE IF NOT EXISTS kv_store (
        \`key\` VARCHAR(255) PRIMARY KEY,
        value LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)
  );
}

export async function dbGet<T>(key: string): Promise<T | null> {
  return withDB(async (conn) => {
    const [rows] = await conn.execute<mysql.RowDataPacket[]>(
      "SELECT value FROM kv_store WHERE `key` = ?",
      [key]
    );
    if (rows.length === 0) return null;
    return JSON.parse(rows[0].value) as T;
  });
}

export async function dbSet<T>(key: string, value: T): Promise<void> {
  await withDB((conn) =>
    conn.execute(
      "INSERT INTO kv_store (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)",
      [key, JSON.stringify(value)]
    )
  );
}
