var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Próbafeladat - Főoldal" });
});

module.exports = router;
