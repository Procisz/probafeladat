const express = require("express");
const router = express.Router();
const Database = require("./../modules/database-main");
const database = new Database();

/** Check api link */
router.get("/", async (req, res) => {
  res.send("Api link works. Go to /api/angular for datas.");
});

/** Check database connection */
router.get("/angular", async (req, res) => {
  let users = await database.readRecord("users", {});
  let orders = await database.readRecord("orders", {});
  let products = await database.readRecord("products", {});
  let statuses = await database.readRecord("statuses", {});
  res.json({
    users: users,
    orders: orders,
    products: products,
    statuses: statuses
  });
});

/** POST requests at http://localhost:3000/tablename */
router.post("/:table", async (req, res) => {
  // console.log("req.params.table: ", req.params.table);
  // console.log("req.body: ", req.body);
  res.json(await database.createRecord(req.params.table, req.body));
});

/** GET requests at http://localhost:3000/api/tablename/querystring */
router.get("/:table", async (req, res) => {
  res.json(await database.readRecord(req.params.table, req.query));
  // console.log("req.params.table: ", req.params.table);
  // console.log("req.query: ", req.query);
});


/** PUT requests at http://localhost:3000/tablename */
router.put("/:table", async (req, res) => {
  res.json(await database.updateRecord(req.params.table, req.query, req.body));
});

/** DELETE requests from http://localhost:3000/api/tablename/querystring */
router.delete("/:table/", async (req, res) => {
  res.json(await database.deleteRecord(req.params.table, req.query));
});

module.exports = router;
