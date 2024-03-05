// This controller will handle operations related to Quiz System
import { Request, Response } from "express";
import question from "../models/question";
import { Schema } from "mongoose";

interface CustomRequest extends Request {
  body: {
    course_id: Schema.Types.ObjectId;
  };
}

interface createEnrollmentRequest extends Request {
  body: {
    user_id: Schema.Types.ObjectId;
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

// export const getCourseQuestions2 = async (
//   req: createEnrollmentRequest,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { user_id, course_id } = req.body;

//     // Find all enrollments for the user and populate the course details
//     const enrollments = await Enrollment.find({
//       user_id: user_id,
//       course_id: course_id,
//     });
//     console.log(enrollments);

//     // Check if enrollments were found
//     if (enrollments.length === 0) {
//       // No enrollments found, send an empty array as response
//       res.status(200).json([]);
//     } else {
//       // Enrollments found, send them as response
//       res.status(200).json(enrollments);
//     }
//   } catch (error) {
//     // If an error occurs, send an error message
//     const errorMessage = (error as Error).message;
//     res.status(500).json({ message: errorMessage });
//   }
// };

// export const enrollStudent = async (
//   req: createEnrollmentRequest,
//   res: Response
// ): Promise<void> => {
//   try {
//     // Assuming that 'user_id' is passed as a parameter in the request
//     const { user_id, course_id } = req.body;

//     // Find all enrollments for the user and populate the course details
//     const newEnrollment = new Enrollment({
//       user_id: user_id,
//       course_id: course_id,
//       completion_status: false,
//       points: 0,
//     });

//     const savedEnrollment = await newEnrollment.save();
//     // Send the saved enrollment as a response
//     res.status(201).json(savedEnrollment);
//   } catch (error) {
//     // If an error occurs, send an error message
//     console.error("Error saving enrollment:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
