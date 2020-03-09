module.exports = class SetGenerator {
  constructor() {
    this.setString = "";
  }

  /**
   * Gets a MySQL compatible query string.
   * @param {req.body} data An object representing the data to be changed
   * @returns {string} A MySQL compatible SET string "field1 = value1, field2 = value2"
   */
  getSetString(data) {
    this.generateSetString(data);
    return this.setString;
  }

  generateSetString(data) {
    this.emptyString();
    Object.keys(data).forEach((key, index) => {
      if (key !== "id" && key !== "insdate") {
        this.setString = this.setString.concat(
          `${key}=${this.apostropheByType(data[key])}`
        );
        this.setString = this.setString.concat(", ");
      }
    });
    this.setString = this.setString.replace(/,\s$/, "");
  }

  emptyString() {
    this.setString = "";
  }

  apostropheByType(value) {
    if (typeof value === "string") {
      return `'${value}'`;
    }
    if (typeof value === "number") {
      return `${value}`;
    }
  }
};
