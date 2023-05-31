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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    }).then((user) => res.json(user));
  }
);
module.exports = router;
