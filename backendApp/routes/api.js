const express = require("express");
const router = express.Router();
const DataBase = require("../modules/database");
const dataBase = new DataBase();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send("Api works.");
});

router.get("/angular", async (req, res, next) => {
  let users = await dataBase.readRecord();
  res.json(users);
});

module.exports = router;
