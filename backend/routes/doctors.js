const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/doctors?query=cardio
router.get("/", async (req, res) => {
  try {
    const { query } = req.query;
    const filter = { role: "doctor" };

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { specialty: { $regex: query, $options: "i" } },
      ];
    }

    const doctors = await User.find(filter).select("-password");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
