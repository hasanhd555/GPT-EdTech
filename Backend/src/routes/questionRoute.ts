import express from "express";
import { getCourseQuestions,updateQuestionById } from "../controllers/questionController";
const router = express.Router();

// Get Lessons for a specific course by ID
router.post("/get-by-id", getCourseQuestions);

router.put("/update/:questionId", updateQuestionById);

module.exports = router;
