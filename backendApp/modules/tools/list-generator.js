module.exports = class ListGenerator {
  constructor() {
    this.list = "";
  }

  /**
   * Generates a list of the given objects keys
   * @param {Object} data An object representation of the record you want to create.
   * @returns {string} A MySQL list of the field names
   */
  getFieldNames(data) {
    this.generateFieldNames(data);
    return this.list;
  }

  /**
   * Generates a list of the given objects properties
   * @param {Object} data An object representation of the record you want to create.
   * @returns {string} A MySQL list of the field values
   */
  getFieldValues(data) {
    this.generateFieldValues(data);
    return this.list;
  }

  generateFieldNames(data) {
    this.emptyList();
    this.initData(data);
    this.dataKeys.forEach(key => {
      if (key !== "id" && key !== "insdate") {
        if (this.list !== "") {
          this.list = this.list.concat(", ");
        }
        this.list = this.list.concat(key);
      }
    });
  }

  generateFieldValues(data) {
    this.emptyList();
    this.initData(data);
    this.dataKeys.forEach(key => {
      if (key === "id" || key === "insdate") {
        return;
      }
      if (key === "username" || key === "password") {
        if (this.list !== "") {
          this.list = this.list.concat(", ");
        }
        this.list = this.list.concat(this.apostropheByType(key));
      } else {
        if (this.list !== "") {
          this.list = this.list.concat(", ");
        }
        this.list = this.list.concat(this.apostropheByType(key));
      }
    });
  }

  initData(data) {
    this.data = data;
    this.dataKeys = Object.keys(data);
  }

  emptyList() {
    this.list = "";
  }

  apostropheByType(key) {
    if (typeof this.data[key] === "string") {
      return `'${this.data[key]}'`;
    }
    if (typeof this.data[key] === "number") {
      return `${this.data[key]}`;
    }
  }
};
