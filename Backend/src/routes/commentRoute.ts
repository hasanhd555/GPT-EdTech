// commentRoute.ts

import express from 'express';
const router = express.Router();
const { getCommentsByCourseId, addComment } = require('../controllers/commentController');

// Get Comments for a specific course by ID
router.post('/get-by-id', getCommentsByCourseId);

router.post('/add-comment', addComment);


module.exports = router;


