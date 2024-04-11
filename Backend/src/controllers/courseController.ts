// courseController.ts

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Course from "../models/course";
import Lesson from "../models/lesson"; // Assuming you have this model
import Question from "../models/question"; // Assuming you have this model
import { course_type } from "../Constant";
import Enrollment from '../models/enrollment';  
import Student from '../models/student'; 

// Get all courses
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.status(StatusCodes.OK).json(courses);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Get a specific course by ID
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const course = await Course.findById(id);
    if (!course) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Course not found" });
    }
    res.status(StatusCodes.OK).json(course);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

export const serchCourseByName = async (req: Request, res: Response) => {
  try {
    const { name } = req?.body;
    console.log("name = ", name);
    // Query the database to find similar courses based on the course name
    if (name) {
      const similarCourses = await Course.find({
        title: { $regex: new RegExp(name, "i") }, // Case-insensitive search for courses with similar title
      });

      if (!similarCourses) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "No Course Found" });
      }
      res.status(StatusCodes.OK).json(similarCourses);
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    console.log("In createCourse", req.body);
    
    const { adminId, name, description, lessons, quizQuestions,image_url } = req.body;

    // Step 0: Create the course without lessons and quiz questions initially
    const course = new Course({
      title: name,
      description,
      admin_id: adminId, 
      image_url: image_url || "https://via.placeholder.com/150",
    });

    const savedCourse = await course.save();

    // Step 1: Create and store lessons with the course_id
    if (lessons && lessons.length) {
      const createdLessons = await Promise.all(
        lessons.map((lesson: any, index: number) => 
          new Lesson({
            ...lesson,
            lesson_num: index + 1, // Assign lesson_num starting from 1
            course_id: savedCourse._id // Now we have the saved course ID to associate
          }).save())
      );
    }

    // Step 2: Create and store questions with the course_id
    if (quizQuestions && quizQuestions.length) {
      const createdQuestions = await Promise.all(
        quizQuestions.map((question: any) =>
          new Question({
            question_text: question.question,
            correct_answer: question.correctOption + 1,
            options: question.options,
            course_id: savedCourse._id,
            concept: question.concept, // Assuming 'concept' is required; adjust as necessary
          }).save()
        )
      );

      // Optionally, link questions to the course here if your schema supports it
    }

    // Optionally, you might want to update the course with references to the created lessons and questions

    res.status(StatusCodes.CREATED).json(savedCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

export const getEditableCourses = async (req: Request, res: Response) => {
  try {
    console.log("In getEditableCourses", req.query)
    const adminId = req.query.adminId; // Assuming adminId is sent as a query parameter
    if (!adminId) {
      return res.status(400).json({ error: 'Admin ID is required' });
    }

    // Query the database for courses with the matching admin_id
    const courses = await Course.find({ admin_id: adminId });

    // If no courses are found, return an appropriate message
    if (courses.length === 0) {
      return res.status(404).json({ message: 'No courses found for this admin' });
    }

    // Return the found courses
    res.status(200).json(courses);
  } catch (error) {
    // Log the error and return a generic server error response
    console.error('Error fetching editable courses:', error);
    res.status(500).json({ error: 'Server error while fetching courses' });
  }
};

export const getCourseAllInfo = async (req: Request, res: Response) => {
  try {
    console.log("In getEditableCourses", req.query)
    const  id  = req.query.courseId
    const course = await Course.findById(id);
    // if (!course) {
    //   return res
    //     .status(StatusCodes.NOT_FOUND)
    //     .json({ error: "Course not found" });
    // }

    if (!course) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Course not found" });
    }

    // Check if the course has an image_url, otherwise, provide a default
    const imageUrl = course.image_url

    // Fetch lessons and questions associated with the course
    const lessons = await Lesson.find
      ({ course_id: course?._id });
    const questions = await Question.find
      ({ course_id: course?._id });

    // Return the course along with lessons and questions
    res.status(StatusCodes.OK).json({ course, lessons, questions,imageUrl });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
}

export const updateDetails = async (req: Request, res: Response) => {
  const { courseId } = req.params; // Assuming you're passing the course ID as a URL parameter
  const { title, description, image_url } = req.body;
  console.log("In updateDetails", req.body, courseId)
  try {
      const updatedCourse = await Course.findByIdAndUpdate(
          courseId,
          { title, description, image_url },
          { new: true } // Return the updated document
      );

      if (!updatedCourse) {
          return res.status(404).json({ message: "Course not found" });
      }

      res.status(200).json(updatedCourse);
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
};

export const getCourseAnalytics = async (req: Request, res: Response) => {
  try {
    console.log("In getCourseAnalytics", req.query);
    const courseId = req.query.courseId;
    if (!courseId) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    // Find all enrollments for the course
    const enrollments = await Enrollment.find({ course_id: courseId }).lean();

    // Map each enrollment to include student name and ID
    const analytics = await Promise.all(enrollments.map(async (enrollment) => {
      // Find the corresponding student
      const student = await Student.findById(enrollment.user_id).lean();
      if (!student) {
        return {
          studentId: 'Unknown ID', // Consider handling unknown IDs differently or omitting these records
          studentName: 'Unknown',
          points: enrollment.points,
        };
      }

      // Combine the student's ID, name with the enrollment's points
      return {
        studentId: student._id,
        studentName: student.name,
        points: enrollment.points,
      };
    }));

    res.json({ analytics });
  } catch (error) {
    console.error("Error fetching course analytics:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateImage = async (req: Request, res: Response) => {
  const { courseId, imageUrl } = req.body;

  if (!courseId || !imageUrl) {
    return res.status(400).json({ message: 'Course ID and new image URL are required.' });
  }

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { image_url: imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    res.status(200).json({ message: 'Course image updated successfully.', data: updatedCourse });
  } catch (error: unknown) {  // Using unknown type for error which is safer than any
    console.error('Update image error:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error updating course image.', error: error.message });
    } else {
      res.status(500).json({ message: 'Error updating course image.', error: 'Unknown error' });
    }
  }
};


module.exports = {
  getAllCourses,
  getCourseById,
  serchCourseByName,
  createCourse,
  getEditableCourses,
  getCourseAllInfo,
  updateDetails,
  getCourseAnalytics,
  updateImage,
};
