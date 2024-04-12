import express from "express";
const router = express.Router();
// Controllers
const {
  signup,
  login,
  getOneStudent,
  getAllStudents,
  updateStudent,
  uploadImage,
} = require("../controllers/studentController");

// SignUp Route
router.route("/signup").post(signup);

// Log In Route
router.route("/login").post(login);

// Get a Specific Student
router.route("/").get(getOneStudent);

// Get All Students
router.route("/all").get(getAllStudents);

// Route to update a student's details
router.put("/update", updateStudent);

// Route to upload an image associated with a student
router.post("/upload-image", uploadImage);

// Exporting the router to be used in other parts of the application
module.exports = router;
