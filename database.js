import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

// SZIMPLÁN KIKREÁLJA AZ ADATBÁZIST
const DbInit = async () => {
  await RunDb(
    "CREATE TABLE IF NOT EXISTS Products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, type TEXT)"
  );
};

// EZ FELEL A LEKÉRDEZÉSÉRT (db.all)
function DbQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// EZ FELEL AZ UPDATE, DELETE, INSERT FUNCKIÓKÉRT (db.run)
function RunDb(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
}

export { DbQuery, DbInit, RunDb, db };
