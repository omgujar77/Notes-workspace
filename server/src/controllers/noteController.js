import Note from "../models/Note.js";

// GET ALL NOTES
export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({
      userId: req.user.id,
      isArchived: req.query.archived === "true",
    }).sort({ updatedAt: -1 });

    res.json(notes);

  } catch (error) {
    next(error);
  }
};

// CREATE NOTE
export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create({
      title: req.body.title || "Untitled",
      content: req.body.content || "",
      tags: req.body.tags || [],
      userId: req.user.id,
    });

    res.status(201).json(note);

  } catch (error) {
    next(error);
  }
};

// UPDATE NOTE
export const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    note.title = req.body.title || "";

    note.content = req.body.content || "";

    note.tags = Array.isArray(req.body.tags)
      ? req.body.tags
      : [];

    const updatedNote = await note.save();

    res.json(updatedNote);

  } catch (error) {
    next(error);
  }
};

// ARCHIVE NOTE
export const archiveNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    note.isArchived = true;

    await note.save();

    res.json({
      message: "Note archived",
      note,
    });

  } catch (error) {
    next(error);
  }
};

// RESTORE NOTE
export const restoreNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    note.isArchived = false;

    await note.save();

    res.json({
      message: "Note restored",
      note,
    });

  } catch (error) {
    next(error);
  }
};

// DELETE NOTE
export const deleteNote = async (req, res, next) => {
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
    next(error);
  }
};