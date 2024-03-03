
import express from 'express';
const router = express.Router();
const { getAverageRatingByCourseId } = require('../controllers/ratingController');

// Get Ratings for a specific course by ID
router.post('/get-by-id', getAverageRatingByCourseId);

module.exports = router;
