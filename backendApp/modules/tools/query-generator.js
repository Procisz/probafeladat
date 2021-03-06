module.exports = class QueryGenerator {
  constructor() {
    this.queryString = "";
  }

  getQueryString(tableName, queryObject) {
    this.generateQueryString(tableName, queryObject);
    return this.queryString;
  }

  generateQueryString(tableName, queryObject = {}) {
    this.clearPreviousQuery();
    this.setMainTable(tableName);
    this.setQuery(queryObject);
    this.setKeys(queryObject);
    this.setSelects();
    this.setFrom();
    this.setWhere();
    this.setGroupBy();
    this.setHaving();
    this.setOrderBy();
    this.setLimit();
    this.endQueryString();
  }

  clearPreviousQuery() {
    this.queryString = "";
  }

  setMainTable(tableName) {
    this.tableName = tableName;
  }

  setQuery(queryObject) {
    this.query = queryObject;
  }

  setKeys(queryObject) {
    this.whereKeys = Object.keys(queryObject);
    if (this.whereKeys.includes("selectCount")) {
      this.whereKeys.splice(this.whereKeys.indexOf("selectCount"), 1);
    } else if (this.whereKeys.includes("select")) {
      this.whereKeys.splice(this.whereKeys.indexOf("select"), 1);
    }
    if (this.whereKeys.includes("from")) {
      this.whereKeys.splice(this.whereKeys.indexOf("from"), 1);
    }
    if (this.whereKeys.includes("where")) {
      this.whereKeys.splice(this.whereKeys.indexOf("where"), 1);
    }
    if (this.whereKeys.includes("like")) {
      this.whereKeys.splice(this.whereKeys.indexOf("like"), 1);
    }
    if (this.whereKeys.includes("groupBy")) {
      this.whereKeys.splice(this.whereKeys.indexOf("groupBy"), 1);
    }
    if (this.whereKeys.includes("having")) {
      this.whereKeys.splice(this.whereKeys.indexOf("having"), 1);
    }
    if (this.whereKeys.includes("orderBy")) {
      this.whereKeys.splice(this.whereKeys.indexOf("orderBy"), 1);
    }
    if (this.whereKeys.includes("limit")) {
      this.whereKeys.splice(this.whereKeys.indexOf("limit"), 1);
    }
    if (this.whereKeys.includes("betweenColumn")) {
      this.whereKeys.splice(this.whereKeys.indexOf("betweenColumn"), 1);
    }
    if (this.whereKeys.includes("betweenValues")) {
      this.whereKeys.splice(this.whereKeys.indexOf("betweenValues"), 1);
    }
    // console.log("whereKeys: ", this.whereKeys);
  }

  apostropheByType(value) {
    if (typeof value === "string") {
      return `'${value}'`;
    } else {
      return value;
    }
  }

  setSelects() {
    /** SELECT COUNT */
    if (this.query.selectCount) {
      this.queryString = this.queryString.concat(
        `SELECT COUNT (${this.query.selectCount}) as result`
      );

      /** Simple SELECT */
    } else if (this.query.select) {
      this.queryString = this.queryString.concat(`SELECT ${this.query.select}`);
    } else {
      this.queryString = this.queryString.concat(`SELECT *`);
    }
  }

  setFrom() {
    if (this.query.from) {
      this.queryString = this.queryString.concat(
        ` FROM ${this.tableName} ${this.query.from}`
      );
    } else {
      this.queryString = this.queryString.concat(` FROM ${this.tableName}`);
    }
  }

  setWhere() {
    if (this.whereKeys.length > 0) {
      this.whereKeys.forEach((key, index) => {
        if (index === 0) {
          this.queryString = this.queryString.concat(` WHERE`);
        }
        this.queryString = this.queryString.concat(`
          ${key} = ${this.apostropheByType(this.query[key])} AND `);
      });
      if (this.query.betweenColumn && this.query.betweenValues) {
        this.queryString = this.queryString.concat(
          ` ${this.query.betweenColumn} BETWEEN ${this.query.betweenValues}`
        );
      } else {
        this.queryString = this.queryString.replace(/\sAND\s$/, "");
      }
    }

    /** LIKE */
    if (this.query.where && this.query.like) {
      this.queryString = this.queryString.concat(
        ` WHERE ${this.query.where} LIKE '%${this.query.like}%'`
      );
    }

    /** BETWEEN */
    if (this.query.betweenColumn && this.query.betweenValues) {
      this.queryString = this.queryString.concat(
        ` ${this.query.betweenColumn} BETWEEN ${this.query.betweenValues}`
      );
    } else {
      this.queryString = this.queryString.replace(/\sAND\s$/, "");
    }
  }

  setGroupBy() {
    if (this.query.groupBy) {
      this.queryString = this.queryString.concat(` GROUP BY
        ${this.query.groupBy}
      `);
    }
  }

  setHaving() {
    if (this.query.having) {
      this.queryString = this.queryString.concat(
        ` HAVING ${this.query.having}`
      );
    }
  }

  setOrderBy() {
    if (this.query.orderBy) {
      this.queryString = this.queryString.concat(
        ` ORDER BY ${this.query.orderBy}`
      );
    }
  }

  setLimit() {
    if (this.query.limit) {
      this.queryString = this.queryString.concat(` LIMIT ${this.query.limit}`);
    }
  }

  endQueryString() {
    this.queryString = this.queryString.concat(";");
  }
};
