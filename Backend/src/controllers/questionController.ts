// This controller will handle operations related to Quiz System
import { Request, Response } from "express";
import question from "../models/question";
import { Schema } from "mongoose";

interface CustomRequest extends Request {
  body: {
    course_id: Schema.Types.ObjectId;
  };
}

// This function will retrieve all courses for a given user
export const getCourseQuestions = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    // Assuming that 'user_id' is passed as a parameter in the request
    const { course_id } = req.body;

    // Find all enrollments for the user and populate the course details
    const questions = await question.find({ course_id: course_id });

    console.log(questions);

    // Extract the course details from the enrollments
    // const courses = enrollments.map((enrollment) => enrollment.course_id);

    // Send the course details as a response
    res.status(200).json(questions);
  } catch (error) {
    // If an error occurs, send an error message
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};
