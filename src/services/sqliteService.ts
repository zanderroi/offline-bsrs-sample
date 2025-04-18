import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

const sqlite = new SQLiteConnection(CapacitorSQLite);
let db: SQLiteDBConnection | null = null;

const dbName = "offline_bsrs_app";

export const initDB = async () => {
  const isConn = (await sqlite.isConnection(dbName, false)).result;

  db = isConn
    ? await sqlite.retrieveConnection(dbName, false)
    : await sqlite.createConnection(dbName, false, "no-encryption", 1, false);

  const isOpen = (await db.isDBOpen()).result;
  if (!isOpen) {
    await db.open();
  }

  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT,
      role_id INTEGER,
      full_data TEXT
    );

    CREATE TABLE IF NOT EXISTS schools (
      id INTEGER PRIMARY KEY,
      name TEXT,
      code TEXT,
      address TEXT,
      region_id INTEGER,
      province_id INTEGER,
      full_data TEXT
    );

    CREATE TABLE IF NOT EXISTS biometrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      biometric_data TEXT
    );
  `);

  return db;
};

export const getDB = async (): Promise<SQLiteDBConnection> => {
  if (!db) {
    await initDB();
  }
  return db!;
};

export const closeDB = async () => {
  if (db) {
    await db.close();
    db = null;
  }
};
  
  // **Export saveUserData** properly
  export const saveUserData = async (user: any) => {
    const db = await getDB();
    const school = user.schooladmin_profiles?.school;
    const biometric = user.schooladmin_profiles?.biometrics;
  
    await db.run(
      `INSERT OR REPLACE INTO users (id, name, email, role_id, full_data)
       VALUES (?, ?, ?, ?, ?)`,
      [user.id, user.name, user.email, user.role_id, JSON.stringify(user)]
    );
  
    if (school) {
      await db.run(
        `INSERT OR REPLACE INTO schools (id, name, code, address, region_id, province_id, full_data)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          school.id,
          school.name,
          school.code,
          school.address,
          school.tesda_region_id,
          school.tesda_province_id,
          JSON.stringify(school),
        ]
      );
    }
  
    if (biometric) {
      await db.run(
        `INSERT INTO biometrics (user_id, biometric_data) VALUES (?, ?)`,
        [user.id, biometric]
      );
    }
  };