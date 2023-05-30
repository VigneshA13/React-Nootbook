const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  obj = {
    name: "Vignesh",
    age: 23,
  };
  res.json(obj);
});
module.exports = router;
