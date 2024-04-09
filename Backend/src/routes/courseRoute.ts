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
  updateDetails,
  getCourseAnalytics,
} = require("../controllers/courseController");

// Get All Courses
router.post("/", getAllCourses);

// Get A Specific Course by ID
router.post("/get-info", getCourseById);

// Get A Specific Course Info by ID
router.get("/get-all-info", getCourseAllInfo);

// Get A Specific Course Info by ID
router.get("/get-course-analytics", getCourseAnalytics);

router.put("/update-details/:courseId", updateDetails);

// Create a new course 
router.post("/create", createCourse);

// Search Similar Course by Name
router.post("/search", serchCourseByName);

// Search Similar Course by Name
router.get("/editable", getEditableCourses);

module.exports = router;
