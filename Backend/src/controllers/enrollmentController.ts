import { Request, Response } from 'express';
import Enrollment from '../models/enrollment'; // Adjust the path according to your project structure
import mongoose, { Schema } from 'mongoose';



interface CustomRequest extends Request {
  body: {
    user_id: Schema.Types.ObjectId;
  };
}
export const getCoursesForUser = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    // Extrating the user id
    const { user_id } = req.body;
    console.log(user_id)

    if (!user_id) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    // Fetching all enrollments for the user using user_id
    const enrollments = await Enrollment.find({ user_id: user_id });
    console.log(enrollments);

    const courseIds = enrollments.map(enrollment => enrollment.course_id);

    res.json({ user_id, courses: courseIds });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server Error' });
  }
};