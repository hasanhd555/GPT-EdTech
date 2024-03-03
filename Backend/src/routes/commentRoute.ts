// commentRoute.ts

import express from 'express';
const router = express.Router();
const { getCommentsByCourseId } = require('../controllers/commentController');

// Get Comments for a specific course by ID
router.post('/get-by-id', getCommentsByCourseId);

module.exports = router;
