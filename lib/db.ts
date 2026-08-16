import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    const url = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL || process.env.DATABASE_URL;
    if (url) {
      const parsed = new URL(url);
      pool = mysql.createPool({
        host: parsed.hostname,
        port: Number(parsed.port) || 3306,
        user: decodeURIComponent(parsed.username),
        password: decodeURIComponent(parsed.password),
        database: parsed.pathname.slice(1),
        ssl: { rejectUnauthorized: false },
        waitForConnections: true,
        connectionLimit: 5,
      });
    } else {
      pool = mysql.createPool({
        host: process.env.MYSQLHOST || process.env.DB_HOST,
        port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
        user: process.env.MYSQLUSER || process.env.DB_USER,
        password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
        database: process.env.MYSQLDATABASE || process.env.DB_NAME,
        ssl: { rejectUnauthorized: false },
        waitForConnections: true,
        connectionLimit: 5,
      });
    }
  }
  return pool;
}

export async function initDB(): Promise<void> {
  const db = getPool();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS kv_store (
      \`key\` VARCHAR(255) PRIMARY KEY,
      value LONGTEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

export async function dbGet<T>(key: string): Promise<T | null> {
  const db = getPool();
  const [rows] = await db.execute<mysql.RowDataPacket[]>(
    "SELECT value FROM kv_store WHERE `key` = ?",
    [key]
  );
  if (rows.length === 0) return null;
  return JSON.parse(rows[0].value) as T;
}

export async function dbSet<T>(key: string, value: T): Promise<void> {
  const db = getPool();
  await db.execute(
    "INSERT INTO kv_store (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)",
    [key, JSON.stringify(value)]
  );
}
