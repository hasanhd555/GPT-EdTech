// lessonRoute.ts

import express from 'express';
const router = express.Router();
const { getLessonsByCourseId } = require('../controllers/lessonController');

// Get Lessons for a specific course by ID
router.post('/get-by-id', getLessonsByCourseId);

module.exports = router;
