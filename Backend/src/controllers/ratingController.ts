import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Rating from "../models/rating";

// Get ratings for a specific course by ID
export const getRatingsByCourseId = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const ratings = await Rating.find({ course_id: id });
      res.status(StatusCodes.OK).json(ratings);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
  };
  
module.exports = {
  getRatingsByCourseId
};
