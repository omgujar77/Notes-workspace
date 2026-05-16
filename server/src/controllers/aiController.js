import Note from "../models/Note.js";
import User from "../models/User.js";

import { summarizeNote } from "../services/geminiService.js";

export const generateSummary = async (
  req,
  res
) => {

  try {

    const noteId =
      req.params.id;

    const note =
      await Note.findOne({
        _id: noteId,
        userId: req.user.id,
      });

    if (!note) {

      return res.status(404).json({
        message: "Note not found",
      });
    }

    // VALIDATION
    if (
      !note.content ||
      note.content.trim() === ""
    ) {

      return res.status(400).json({
        message:
          "Note content is empty",
      });
    }

    // GENERATE AI RESPONSE
    const aiResult =
      await summarizeNote(
        note.content
      );

    // UPDATE NOTE
    note.aiGenerated = true;

    note.aiGeneratedAt =
      new Date();

    await note.save();

    // UPDATE USER STATS
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $inc: {
          aiUsageCount: 1,
        },
      }
    );

    res.status(200).json(
      aiResult
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed to generate summary",
    });
  }
};

