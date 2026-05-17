import mongoose from "mongoose";
import Note from "../models/Note.js";

export const getDashboardStats = async (req, res) => {
  try {

    const userId = req.user.id;

    const userObjectId =
      new mongoose.Types.ObjectId(userId);

    // TOTAL NOTES
    const totalNotes =
      await Note.countDocuments({
        userId: userObjectId,
        isArchived: false,
      });

    // ARCHIVED NOTES
    const archivedNotes =
      await Note.countDocuments({
        userId: userObjectId,
        isArchived: true,
      });

    // PUBLIC NOTES
    const publicNotes =
      await Note.countDocuments({
        userId: userObjectId,
        isPublic: true,
      });

    // AI GENERATED NOTES
    const aiUsageCount =
      await Note.countDocuments({
        userId: userObjectId,
        aiGenerated: true,
      });

    // RECENTLY EDITED
    const recentEditedCount =
      await Note.countDocuments({
        userId: userObjectId,
        updatedAt: {
          $gte: new Date(
            Date.now() -
            7 * 24 * 60 * 60 * 1000
          ),
        },
      });

    // RECENT NOTES
    const recentNotes =
      await Note.find({
        userId: userObjectId,
        isArchived: false,
      })
        .sort({
          updatedAt: -1,
        })
        .limit(5)
        .select(
          "title tags updatedAt"
        );

    // TOP TAGS
    const topTags =
      await Note.aggregate([
        {
          $match: {
            userId: userObjectId,
            isArchived: false,
          },
        },

        {
          $unwind: "$tags",
        },

        {
          $group: {
            _id: "$tags",
            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },

        {
          $limit: 5,
        },

        {
          $project: {
            _id: 0,
            tag: "$_id",
            count: 1,
          },
        },
      ]);

    // WEEKLY ACTIVITY
    const weeklyActivity = [];

    for (
      let i = 6;
      i >= 0;
      i--
    ) {

      const start =
        new Date();

      start.setDate(
        start.getDate() - i
      );

      start.setHours(
        0,
        0,
        0,
        0
      );

      const end =
        new Date(start);

      end.setHours(
        23,
        59,
        59,
        999
      );

      const count =
        await Note.countDocuments({
          userId: userObjectId,
          updatedAt: {
            $gte: start,
            $lte: end,
          },
        });

      weeklyActivity.push({
        day:
          start.toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          ),

        count,
      });
    }

    // AI CREDIT SYSTEM
    const monthlyLimit = 100;

    const remainingCredits =
      monthlyLimit -
      aiUsageCount;

    res.status(200).json({
      totalNotes,
      archivedNotes,
      publicNotes,
      aiUsageCount,
      remainingCredits,
      recentEditedCount,
      topTags,
      recentNotes,
      weeklyActivity,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Dashboard stats error",

      error:
        error.message,
    });
  }
};