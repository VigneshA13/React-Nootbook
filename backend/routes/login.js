const express = require("express");
const User = require("../modules/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userfetch = require("../middleware/fetchUser");

const JWT_SCRECT = "vignesh13$13";

// Route : 1 => the below code is used to create a new user
router.post(
  "/signup",
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
      const token = jwt.sign(data, JWT_SCRECT);
      res.json({ token });
    } catch (error) {
      console.error(error.message);
    }
  }
);

//  Route : 2 => the below code is used for login
router.post(
  "/signin",
  [
    body("email", "Enter a valid Email id").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });

      // check wheater the user is exist or not
      if (!user) {
        return res.status(400).json({ error: "Inavlid email ID." });
      }

      // check wheather the password correct or not (it return true or false)
      let pass = await bcrypt.compare(password, user.password);
      if (!pass) {
        return res.status(400).json({ error: "Inavlid password." });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SCRECT);
      res.json({ token });
    } catch (error) {
      console.log(error);
    }
  }
);

//  Route : 3 => select all the details of the user using token
router.post("/getuser", userfetch, async (req, res) => {
  try {
    let userId = req.user.id;
    // below is the select query
    // -password means featch all the fields except password field
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
