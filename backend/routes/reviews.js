const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const Review = require("../models/Review");

// POST /api/reviews -> submit a review
router.post("/", requireAuth, async (req, res) => {
  try {
    const { doctor, rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment are required" });
    }
    const review = await Review.create({
      user: req.user.id,
      doctor: doctor || null,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/reviews -> list all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name").sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
