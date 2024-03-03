import express from "express";
const router = express.Router();

const {
  getCoursesForUser,
  enrollStudent,
  getCourseEnrollement,
} = require("../controllers/enrollmentController");

// Route to get courses for a user
router.post("/courses", getCoursesForUser);
router.post("/enroll", enrollStudent);
router.post("/get-enrollment", getCourseEnrollement);

module.exports = router;
