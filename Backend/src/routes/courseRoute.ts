// courseRoute.ts

import express from "express";
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  serchCourseByName,
  createCourse,
} = require("../controllers/courseController");

// Get All Courses
router.post("/", getAllCourses);

// Get A Specific Course by ID
router.post("/get-info", getCourseById);

// Create a new course 
router.post("/create", createCourse);

// Search Similar Course by Name
router.post("/search", serchCourseByName);

module.exports = router;
