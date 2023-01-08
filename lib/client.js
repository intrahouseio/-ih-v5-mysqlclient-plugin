/**
 * mysql client
 */

const mysql = require('mysql');

module.exports = {
  pool: null,

  async createPoolToDatabase(dbopt) {
    dbopt.connectionLimit = 10;
    this.pool = mysql.createPool(dbopt);
  },

  run(sql, values) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, [values], (err, res) => {
        if (!err) {
          resolve(res);
        } else reject(err);
      });
    });
  },

  query(sql) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, (err, res) => {
        if (!err) {
          resolve(res);
        } else reject(err);
      });
    });
  },

};