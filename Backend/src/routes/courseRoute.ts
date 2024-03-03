// courseRoute.ts

import express from 'express';
const router = express.Router();
const { getAllCourses, getCourseById } = require('../controllers/courseController');

// Get All Courses
router.post('/', getAllCourses);

// Get A Specific Course by ID
router.post('/get-info', getCourseById);

module.exports = router;
