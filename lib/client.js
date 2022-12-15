/**
 * mysql client
 */

const mysql = require('mysql');

module.exports = {
  pool: null,

  async createPoolToDatabase(dbopt) {
    const database = dbopt.database;
    dbopt.database = null;

    await this.connectAndQuery('CREATE DATABASE IF NOT EXISTS ' + database, dbopt);

    dbopt.database = database;
    dbopt.connectionLimit = 10;
    this.pool = mysql.createPool(dbopt);
  },

  connectAndQuery(query, dbopt) {
    const connection = mysql.createConnection(dbopt);
    return new Promise((resolve, reject) => {
      connection.query(query, err => {
        connection.end();
        if (!err) {
          resolve();
        } else reject(err);
      });
    });
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