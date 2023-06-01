const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let obj = {
    name: "Vignesh",
  };
  res.json(obj);
});
module.exports = router;
