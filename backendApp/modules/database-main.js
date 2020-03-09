const mariadb = require("mariadb");
const WhereGenerator = require("./tools/where-generator");
const ListGenerator = require("./tools/list-generator");
const SetGenerator = require("./tools/set-generator");
const QueryGenerator = require("./tools/query-generator");
const whereGenerator = new WhereGenerator();
const listGenerator = new ListGenerator();
const setGenerator = new SetGenerator();
const queryGenerator = new QueryGenerator();

const pool = mariadb.createPool({
  database: "probafeladat",
  user: "root",
  password: "root",
  connectionLimit: 100
});

module.exports = class BetagDB {
  constructor() {
    pool.getConnection().then(conn => (this.connection = conn));
  }

  /**
   * Concats the query and adds a record to your MySQL database table.
   * @param {string} tableName The MySQL table, you want to post to.
   * @param {req.body} data The data to be inserted into the table.
   * @returns The result of your post query.
   */
  async createRecord(tableName, data) {
    try {
      const query = `INSERT INTO ${tableName} (${listGenerator.getFieldNames(
        data
      )}) VALUES (${listGenerator.getFieldValues(data)})`;
      return await this.connection.query(query.concat(";"));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Concats the query and reads the MySQL database table accordingly.
   * @param {string} tableName The MySQL table, you want to read from.
   * @param {req.query} queryObject The request URL query string object.
   * @returns The read data from your MySQL database.
   */
  async readRecord(tableName, queryObject = {}) {
    try {
      let result = await this.connection.query(
        queryGenerator.getQueryString(tableName, queryObject)
      );
      // console.log("SQL lekérdezés eredménye:", result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates the values of an existing record.
   * @param {string} tableName The MySQL table, where you want to change a record
   * @param {req.query} queryObject The URL query string object.
   * @param {req.body} data The data to be changed in your table.
   * @returns The result of your update query
   */
  async updateRecord(tableName, queryObject, data) {
    try {
      let query = `UPDATE ${tableName}
      SET ${setGenerator.getSetString(data)}`;
      query = query.concat(whereGenerator.getWhereString(queryObject));
      if (!query.includes("WHERE")) {
        return;
      }
      return await this.connection.query(query.concat(";"));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Concats the query and deletes the given record from your MySQL table.
   * @param {string} tableName The MySQL table, you want to read from.
   * @param {queryObject} queryObject The request URL query string object.
   * @returns {undefined} If your query object doesn't include any conditions.
   * @returns {Promise} The result of your deletion query.
   */
  async deleteRecord(tableName, queryObject) {
    try {
      let query = `DELETE FROM ${tableName}`;
      query = query.concat(whereGenerator.getWhereString(queryObject));
      if (!query.includes("WHERE")) {
        return;
      }
      return await this.connection.query(query.concat(";"));
    } catch (error) {
      throw error;
    }
  }
};
