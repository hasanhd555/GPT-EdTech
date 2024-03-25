// courseRoute.ts

import express from "express";
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  serchCourseByName,
  createCourse,
  getEditableCourses,
  getCourseAllInfo,
} = require("../controllers/courseController");

// Get All Courses
router.post("/", getAllCourses);

// Get A Specific Course by ID
router.post("/get-info", getCourseById);

// Get A Specific Course by ID
router.get("/get-all-info", getCourseAllInfo);

// Create a new course 
router.post("/create", createCourse);

// Search Similar Course by Name
router.post("/search", serchCourseByName);

// Search Similar Course by Name
router.get("/editable", getEditableCourses);

module.exports = router;
