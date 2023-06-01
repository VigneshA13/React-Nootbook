const express = require("express");
const User = require("../modules/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("name", "Enter a valid user name").isLength({ min: 3 }),
    body("email", "Enter a valid Email id").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //the below if condition is used to check weather email exist or not
      //if exist it returns Email exits message
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email ID already exist." });
      }
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });

      res.json({ msg: "added..." });
    } catch (error) {
      console.error(error.message);
    }
  }
);
module.exports = router;
