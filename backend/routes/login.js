const express = require("express");
const User = require("../modules/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SCRECT = "vignesh13$13";

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
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_SCRECT);
      console.log(jwtData);
      res.json(user);
    } catch (error) {
      console.error(error.message);
    }
  }
);
module.exports = router;
