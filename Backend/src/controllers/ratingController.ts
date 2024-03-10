import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Rating from "../models/rating";
import { Schema } from "mongoose";

interface CustomRequest extends Request {
  body: {
    course_id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    rating: Schema.Types.Number;
  };
}

// Get ratings for a specific course by ID
export const getAverageRatingByCourseId = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.body;
    const ratings = await Rating.find({ course_id: id });

    // Calculate the average rating
    const averageRating =
      ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    // Check if ratings exist, if not, return a default message or value
    if (ratings.length === 0) {
      return res.status(StatusCodes.OK).json({ averageRating: 0 });
    }

    // Return the average rating
    res.status(StatusCodes.OK).json({ averageRating });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

export const giveRating = async (req: CustomRequest, res: Response) => {
  const { course_id, user_id, rating } = req.body;

  try {
    // Find the existing rating or create a new one if none exists
    let updatedRating = await Rating.findOneAndUpdate(
      { course_id, user_id },
      { rating },
      { new: true, upsert: true } // Return the updated document and create it if it doesn't exist
    );

    res.status(200).json({
      message: "Rating updated or created successfully",
    });
  } catch (error) {
    console.error("Error updating or creating rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAverageRatingByCourseId,
  giveRating,
};
