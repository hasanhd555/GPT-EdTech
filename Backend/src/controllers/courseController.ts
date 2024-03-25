// courseController.ts

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Course from "../models/course";
import Lesson from "../models/lesson"; // Assuming you have this model
import Question from "../models/question"; // Assuming you have this model
import { course_type } from "../Constant";

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
    const { adminId, name, description, lessons, quizQuestions } = req.body;

    // Step 0: Create the course without lessons and quiz questions initially
    const course = new Course({
      title: name,
      description,
      admin_id: adminId,
      // Assuming an image_url field is required; use a placeholder or actual URL as needed
      image_url: "https://via.placeholder.com/150",
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
            concept: "Placeholder Concept", // Assuming 'concept' is required; adjust as necessary
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
    if (!course) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Course not found" });
    }

    // Fetch lessons and questions associated with the course
    const lessons = await Lesson.find
      ({ course_id: course._id });
    const questions = await Question.find
      ({ course_id: course._id });

    // Return the course along with lessons and questions
    res.status(StatusCodes.OK).json({ course, lessons, questions });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
}




module.exports = {
  getAllCourses,
  getCourseById,
  serchCourseByName,
  createCourse,
  getEditableCourses,
  getCourseAllInfo,
};
