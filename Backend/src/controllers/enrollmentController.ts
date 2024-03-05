// This controller will handle operations related to enrollments
import { Request, Response } from "express";
import Enrollment from "../models/enrollment";
import "../models/course";
import { Schema } from "mongoose";

interface CustomRequest extends Request {
  body: {
    user_id: Schema.Types.ObjectId;
  };
}

interface createEnrollmentRequest extends Request {
  body: {
    user_id: Schema.Types.ObjectId;
    course_id: Schema.Types.ObjectId;
  };
}

// This function will retrieve all courses for a given user
export const getCoursesForUser = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    // Assuming that 'user_id' is passed as a parameter in the request
    const { user_id } = req.body;
    console.log(user_id);

    // Find all enrollments for the user and populate the course details
    const enrollments = await Enrollment.find({ user_id: user_id })
      .populate("course_id")
      .exec();
    console.log(enrollments);

    // Extract the course details from the enrollments
    const courses = enrollments.map((enrollment) => enrollment.course_id);

    // Send the course details as a response
    res.status(200).json(courses);
  } catch (error) {
    // If an error occurs, send an error message
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const getCourseEnrollement = async (
  req: createEnrollmentRequest,
  res: Response
): Promise<void> => {
  try {
    const { user_id, course_id } = req.body;

    // Find all enrollments for the user and populate the course details
    const enrollments = await Enrollment.find({
      user_id: user_id,
      course_id: course_id,
    });
    console.log(enrollments);

    // Check if enrollments were found
    if (enrollments.length === 0) {
      // No enrollments found, send an empty array as response
      res.status(200).json([]);
    } else {
      // Enrollments found, send them as response
      res.status(200).json(enrollments);
    }
  } catch (error) {
    // If an error occurs, send an error message
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const enrollStudent = async (
  req: createEnrollmentRequest,
  res: Response
): Promise<void> => {
  try {
    // Assuming that 'user_id' is passed as a parameter in the request
    const { user_id, course_id } = req.body;

    // Find all enrollments for the user and populate the course details
    const newEnrollment = new Enrollment({
      user_id: user_id,
      course_id: course_id,
      completion_status: false,
      points: 0,
    });

    const savedEnrollment = await newEnrollment.save();
    // Send the saved enrollment as a response
    res.status(201).json(savedEnrollment);
  } catch (error) {
    // If an error occurs, send an error message
    console.error("Error saving enrollment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTotalPoints = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalPointsPerStudent = await Enrollment.aggregate([
      {
        $group: {
          _id: "$user_id", // Group by user_id
          totalPoints: { $sum: "$points" } // Sum up all points for each group
        }
      },
      {
        $lookup: {
          from: "students", // Assuming your Student collection is named 'students'
          localField: "_id",
          foreignField: "_id",
          as: "studentDetails"
        }
      },
      {
        $unwind: "$studentDetails" // Unwind to flatten the studentDetails array
      },
      {
        $project: {
          _id: 0, // Exclude this from the final projection
          studentUsername: "$studentDetails.username",
          totalPoints: 1,
          // studentId: "$_id",
          // studentName: "$studentDetails.name", 
          // studentEmail: "$studentDetails.email",
        }
      },
      {
        $sort: { totalPoints: -1 } // Add this line to sort by totalPoints in descending order
      }
    ]);

    res.status(200).json(totalPointsPerStudent);
  } catch (error) {
    console.error("Error getting total points per student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

