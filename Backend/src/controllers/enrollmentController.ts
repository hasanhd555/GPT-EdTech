// This controller will handle operations related to enrollments
import { Request, Response } from 'express';
import Enrollment from '../models/enrollment';
import '../models/course';
import { Schema } from 'mongoose';


interface CustomRequest extends Request {
  body: {
    user_id: Schema.Types.ObjectId;
  };
}


// This function will retrieve all courses for a given user
export const getCoursesForUser = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    // Assuming that 'user_id' is passed as a parameter in the request
    const { user_id } = req.body;
    console.log(user_id);

    // Find all enrollments for the user and populate the course details
    const enrollments = await Enrollment.find({ user_id: user_id }).populate('course_id').exec();
    console.log(enrollments);

    // Extract the course details from the enrollments
    const courses = enrollments.map(enrollment => enrollment.course_id);

    // Send the course details as a response
    res.status(200).json(courses);
  } catch (error) {
    // If an error occurs, send an error message
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

