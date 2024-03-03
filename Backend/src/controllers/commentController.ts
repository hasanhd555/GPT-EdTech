import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Comment from "../models/comment";

// Define an interface for the student object after it has been populated
interface PopulatedStudent {
  _id?: string;
  username: string;
}

// Define an interface for the comment object after population
interface PopulatedComment {
  comment_text: string;
  student_id: PopulatedStudent;
}

// Get comments for a specific course by ID
export const getCommentsByCourseId = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const comments = await Comment.find({ course_id: id })
                                     .populate('student_id', 'username -_id')
                                     .select('comment_text student_id -_id') as unknown as PopulatedComment[];
      const response = comments.map(comment => ({
        username: comment.student_id.username, // TypeScript now understands that `username` exists.
        comment_text: comment.comment_text
      }));
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
};

// Add a new comment for a specific course by a student
export const addComment = async (req: Request, res: Response) => {
  try {
    const { course_id, student_id, comment_text } = req.body;
    
    if (!course_id || !student_id || !comment_text) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing required fields" });
    }

    // Create a new comment document
    const newComment = new Comment({
      course_id,
      student_id,
      comment_text
    });

    // Save the comment to the database
    await newComment.save();

    // Respond with the created comment
    res.status(StatusCodes.CREATED).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
};

module.exports = {
  getCommentsByCourseId,addComment
};
