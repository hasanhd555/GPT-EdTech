// import { Request, Response } from 'express';
// import Enrollment from '../models/enrollment'; // Adjust the path according to your project structure
// import { Schema } from 'mongoose';



// interface CustomRequest extends Request {
//   body: {
//     user_id: Schema.Types.ObjectId;
//   };
// }
// export const getCoursesForUser = async (req: CustomRequest, res: Response): Promise<void> => {
//   try {
//     // Extrating the user id
//     const { user_id } = req.body;
//     console.log(user_id)

//     if (!user_id) {
//       res.status(400).json({ message: 'User ID is required' });
//       return;
//     }

//     // Fetching all enrollments for the user using user_id
//     const enrollments = await Enrollment.find({ user_id: user_id });
//     console.log(enrollments);

//     const courseIds = enrollments.map(enrollment => enrollment.course_id);

//     res.json({ user_id, courses: courseIds });
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// import { Request, Response } from 'express';
// import Enrollment from '../models/enrollment'; // Adjust the import path as necessary
// import Course from '../models/course'; // Adjust the import path as necessary

// // This function will retrieve all courses for a given user
// export const getCoursesForUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Assuming that 'user_id' is passed as a parameter in the request
//     const { user_id } = req.body;
//     console.log(user_id)

//     // Find all enrollments for the user and populate the course details
//     const enrollments = await Enrollment.find({ user_id: user_id }).populate('course_id').exec();
//     console.log(enrollments)

//     // Extract the course details from the enrollments
//     const courses = enrollments.map(enrollment => enrollment.course_id);

//     // Send the course details as a response
//     res.status(200).json(courses);
//   } catch (error) {
//     // If an error occurs, send an error message
//     const errorMessage = (error as Error).message;
//     res.status(500).json({ message: errorMessage });
//     // res.status(500).json({ message:÷ error.message });
//   }
// };

// // This function will enroll a user in a course
// export const enrollUserInCourse = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { user_id, course_id } = req.body;

//     // Check if the course exists
//     const courseExists = await Course.findById(course_id);
//     if (!courseExists) {
//       res.status(404).json({ message: 'Course not found' });
//       return;
//     }

//     // Create a new enrollment
//     const newEnrollment = new Enrollment({
//       user_id,
//       course_id,
//       completion_status: false, // Assuming the user has not completed the course upon enrollment
//       points: 0 // Assuming the user starts with 0 points
//     });

//     // Save the enrollment to the database
//     const enrollment = await newEnrollment.save();

//     // Send the enrollment data as a response
//     res.status(201).json(enrollment);
//   } catch (error) {
//     // If an error occurs, send an error message
//     const errorMessage = (error as Error).message;
//     res.status(500).json({ message: errorMessage });
//     // res.status(500).json({ message: error.message });
//   }
// };

// // Additional methods (update course status, delete enrollment, etc.) would go here

// // Make sure to export the methods so they can be used in other files
// export default {
//   getCoursesForUser,
//   enrollUserInCourse,
//   // Export other methods here
// };

// This controller will handle operations related to enrollments


import { Request, Response } from 'express';
import Enrollment from '../models/enrollment'; // Adjust the import path as necessary
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

