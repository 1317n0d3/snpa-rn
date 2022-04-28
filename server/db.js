const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const DBSOURCE = "./db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.log(err)
  }
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name text,
            last_name text,
            login text,
            password text,
            date_of_birth text,
            photo_uri text
            )`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

module.exports = db;
