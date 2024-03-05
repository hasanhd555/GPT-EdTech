import express from "express";
import { getCourseQuestions } from "../controllers/questionController";
const router = express.Router();

// Get Lessons for a specific course by ID
router.post("/get-by-id", getCourseQuestions);

module.exports = router;
