import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Rating from "../models/rating";

// Get ratings for a specific course by ID
export const getAverageRatingByCourseId = async (req:Request, res:Response) => {
  try {
    const { id } = req.body;
    const ratings = await Rating.find({ course_id: id });

    // Calculate the average rating
    const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    // Check if ratings exist, if not, return a default message or value
    if(ratings.length === 0) {
      return res.status(StatusCodes.OK).json({averageRating: 0});
    }

    // Return the average rating
    res.status(StatusCodes.OK).json({ averageRating });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
};
  
module.exports = {
  getAverageRatingByCourseId
};
