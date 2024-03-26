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

  export const updateLessonById = async (req: Request, res: Response) => {
    try {
      console.log("updateLessonById");
      const { lessonId } = req.params;
      const { title, content } = req.body;
      
      // Check if lessonId is provided
      if (!lessonId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Lesson ID must be provided" });
      }
      console.log("updateLessonById for lessonId:",lessonId);
  
      // Use findByIdAndUpdate for a more concise operation
      const updatedLesson = await Lesson.findByIdAndUpdate(
        lessonId,
        { title, content },
        { new: true } // Returns the modified document rather than the original
      );
  
      if (!updatedLesson) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Lesson not found" });
      }
  
      res.status(StatusCodes.OK).json(updatedLesson);
    } catch (error) {
      console.error(error); // It's helpful to log the error for debugging purposes
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
  };
  



module.exports = {
  getLessonsByCourseId,
  updateLessonById,
};
