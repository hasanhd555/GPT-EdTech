import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Lesson from "../models/lesson";

// Get lessons for a specific course by ID
export const getLessonsByCourseId = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const lessons = await Lesson.find({ course_id: id });
      res.status(StatusCodes.OK).json(lessons);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
  };

module.exports = {
  getLessonsByCourseId
};
