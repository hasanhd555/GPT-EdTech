// lessonRoute.ts

import express from 'express';
const router = express.Router();
const { getLessonsByCourseId,updateLessonById } = require('../controllers/lessonController');

// Get Lessons for a specific course by ID
router.post('/get-by-id', getLessonsByCourseId);

// Update a lesson 
router.put('/update/:lessonId', updateLessonById);

module.exports = router;
