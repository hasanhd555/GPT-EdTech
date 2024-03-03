
import express from 'express';
const router = express.Router();
const { getRatingsByCourseId } = require('../controllers/ratingController');

// Get Ratings for a specific course by ID
router.post('/get-by-id', getRatingsByCourseId);

module.exports = router;
