import express from "express";
const router = express.Router();
const {
  getAverageRatingByCourseId,
  giveRating,
} = require("../controllers/ratingController");

// Get Ratings for a specific course by ID
router.post("/get-by-id", getAverageRatingByCourseId);
router.post("/give-rating", giveRating);

module.exports = router;
