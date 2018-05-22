'use strict';

let mysql = require('mysql');

module.exports = class SqlLauseet {
  constructor() {}

  suoritaKysely(sql, ...parametrit) {
    return new Promise((resolve, reject) => {
      let yhteys = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "shakkikanta"
      });
      yhteys.query(sql, [...parametrit], (virhe, tulos) => {
        if (virhe) reject(new Error('kyselyvirhe:' + virhe));
        else {
          resolve(tulos);
        }
      });
      yhteys.end();
    });
  }
}
