import express from "express";
const router = express.Router();

const {
  getCoursesForUser,
  enrollStudent,
  getCourseEnrollement,
  getTotalPoints,
  setPoints,
} = require("../controllers/enrollmentController");

// Route to get courses for a user
router.post("/courses", getCoursesForUser);
router.post("/enroll", enrollStudent);
router.post("/get-enrollment", getCourseEnrollement);
router.get("/get-total-points", getTotalPoints);
router.post("/set-points", setPoints);

module.exports = router;
