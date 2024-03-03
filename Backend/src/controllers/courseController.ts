// courseController.ts

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Course from "../models/course";

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
    const { name } = req.body;
    // Query the database to find similar courses based on the course name
    const similarCourses = await Course.find({
      title: { $regex: new RegExp(name, "i") }, // Case-insensitive search for courses with similar title
    });

    if (!similarCourses) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No Course Found" });
    }
    res.status(StatusCodes.OK).json(similarCourses);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};
module.exports = {
  getAllCourses,
  getCourseById,
  serchCourseByName,
};
