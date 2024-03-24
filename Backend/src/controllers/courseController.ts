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
        lessons.map((lesson: any) => 
          new Lesson({ ...lesson, course_id: savedCourse._id }).save())
      );

      // Optionally, link lessons to the course here if your schema supports it
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
          }).save())
      );

      // Optionally, link questions to the course here if your schema supports it
    }

    // Optionally, you might want to update the course with references to the created lessons and questions

    res.status(StatusCodes.CREATED).json(savedCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  serchCourseByName,
  createCourse
};
