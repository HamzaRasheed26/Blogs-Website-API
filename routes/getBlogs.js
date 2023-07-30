const express = require("express");
const router = express.Router();
const { connection } = require("../database/sql");

router.get("/", (req, response) => {
  connection.query("Select * from Blog", (err, result) => {
    if (err) throw err;
    else {
      response.send(result);
    }
  });
});

module.exports = router;
