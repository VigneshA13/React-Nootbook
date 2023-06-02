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

// Route - 3 => the below code is to update the existing notes
router.put("/update/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // create a newNote object
  const newNote = {};
  // if value exist in the fields then the value is added to newNote
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  // find the note to be updated and update it
  let note = await Notes.findById(req.params.id);

  // if note does not exist in that id
  if (!note) {
    return res.status(404).send("Notes does not exits");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});
module.exports = router;
