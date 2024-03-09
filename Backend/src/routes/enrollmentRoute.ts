import express from "express";
const router = express.Router();

const {
  getCoursesForUser,
  enrollStudent,
  getCourseEnrollement,
  getTotalPoints,
} = require("../controllers/enrollmentController");

// Route to get courses for a user
router.post("/courses", getCoursesForUser);
router.post("/enroll", enrollStudent);
router.post("/get-enrollment", getCourseEnrollement);
router.get("/get-total-points", getTotalPoints);


module.exports = router;
