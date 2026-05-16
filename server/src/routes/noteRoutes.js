import express from "express";
import Note from "../models/Note.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// GET ALL NOTES
router.get("/", protect, async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id,
      isArchived: false,
    }).sort({ updatedAt: -1 });

    res.json(notes);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// CREATE NOTE
router.post("/", protect, async (req, res) => {
  try {

    const note = await Note.create({
      title: req.body.title || "Untitled",
      content: req.body.content || "",
      tags: req.body.tags || [],
      userId: req.user.id,
    });

    res.status(201).json(note);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// UPDATE NOTE
router.put("/:id", protect, async (req, res) => {

  try {

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // UPDATE NOTE FIELDS
    note.title = req.body.title || "";

    note.content = req.body.content || "";

    // IMPORTANT FIX
    note.tags = Array.isArray(req.body.tags)
      ? req.body.tags
      : [];

    // SAVE TO DATABASE
    const updatedNote = await note.save();

    res.json(updatedNote);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE NOTE
router.delete("/:id", protect, async (req, res) => {
  try {

    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json({
      message: "Note deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;