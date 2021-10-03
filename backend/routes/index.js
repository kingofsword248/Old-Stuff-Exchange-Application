const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  return res.send("Old Stuff Exchange");
});

router.use("/api/users", require("./auth"));

module.exports = router;
