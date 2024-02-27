import express from 'express';
const router = express.Router();

const { getCoursesForUser } = require('../controllers/enrollmentController');


// Route to get courses for a user
router.post('/courses', getCoursesForUser);

module.exports = router;