import initSqlJs, { Database } from 'sql.js';
import { createTablesSQL } from './schema';

let db: Database | null = null;
let initPromise: Promise<Database> | null = null;

export async function initDatabase(): Promise<Database> {
  if (db) {
    return db;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      const SQL = await initSqlJs({
        locateFile: (file) => `/sql-wasm/${file}`,
      });

      const savedDb = localStorage.getItem('sqliteDb');
      if (savedDb) {
        const uint8Array = new Uint8Array(JSON.parse(savedDb));
        db = new SQL.Database(uint8Array);
      } else {
        db = new SQL.Database();
        db.run(createTablesSQL);
        saveDatabase();
      }

      return db;
    } catch (error) {
      initPromise = null;
      throw error;
    }
  })();

  return initPromise;
}

export function saveDatabase(): void {
  if (!db) return;

  const data = db.export();
  const buffer = Array.from(data);
  localStorage.setItem('sqliteDb', JSON.stringify(buffer));
}

export function getDatabase(): Database {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

export function clearDatabase(): void {
  localStorage.removeItem('sqliteDb');
  db = null;
  initPromise = null;
}
