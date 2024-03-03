// commentController.ts

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Comment from "../models/comment";

// Get comments for a specific course by ID
export const getCommentsByCourseId = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const comments = await Comment.find({ course_id: id }).populate('student_id');
      res.status(StatusCodes.OK).json(comments);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
  };

module.exports = {
  getCommentsByCourseId
};
