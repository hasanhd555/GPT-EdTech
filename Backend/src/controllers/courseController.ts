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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
};

// Get a specific course by ID
export const getCourseById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const course = await Course.findById(id);
      if (!course) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Course not found" });
      }
      res.status(StatusCodes.OK).json(course);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
  };

module.exports = {
  getAllCourses,
  getCourseById
};
