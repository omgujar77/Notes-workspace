import { nanoid } from "nanoid";
import Note from "../models/Note.js";


// TOGGLE PUBLIC/PRIVATE
export const togglePublicNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // toggle
    note.isPublic = !note.isPublic;

    // generate shareId first time
    if (note.isPublic && !note.shareId) {
      note.shareId = nanoid(10);
    }

    await note.save();

    res.status(200).json({
      success: true,
      isPublic: note.isPublic,
      shareId: note.shareId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET PUBLIC NOTE
export const getPublicNote = async (req, res) => {
  try {
    const { shareId } = req.params;

    const note = await Note.findOne({
      shareId,
      isPublic: true,
    }).select("title content tags createdAt");

    if (!note) {
      return res.status(404).json({
        message: "Public note not found",
      });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};