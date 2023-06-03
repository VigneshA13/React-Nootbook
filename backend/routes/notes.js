const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Notes = require("../modules/Notes");
const { body, validationResult } = require("express-validator");

// Route - 1 => the below code is to fetch already existing notes
router.get("/notes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
  }
});

// Route - 2 => the below code is to Add new notes
router.post(
  "/create",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const save = await note.save();

      res.json(save);
    } catch (error) {
      console.log(error);
    }
  }
);
module.exports = router;
