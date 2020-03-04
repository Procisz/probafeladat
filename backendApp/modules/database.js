const path = require("path");
const fs = require("fs");
const mariadb = require("mariadb");
const pool = mariadb.createPool({
  database: "probafeladat",
  user: "root",
  password: "root",
  connectionLimit: 100
});

module.exports = class DataBase {
  constructor() {
    pool.getConnection().then(connection => (this.connection = connection));
  }

  //Insert data
  insertRecord() {}
  //Read data
  async readRecord() {
    try {
      let sql = `
      SELECT *
      FROM users
      `;
      let result = await this.connection.query(sql);
      return result;
    } catch (err) {
      throw err;
    }
  }

  //Update data
  updateRecord() {}

  //Delete data
  deleteRecord() {}
};
