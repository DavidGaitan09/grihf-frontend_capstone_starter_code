const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const Appointment = require("../models/Appointment");

// POST /api/appointments  -> create appointment (Name, Phone, [Date, Time])
router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, phone, date, time, doctor } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }
    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor: doctor || null,
      name,
      phone,
      date,
      time,
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/appointments/mine -> list appointments for logged in patient
router.get("/mine", requireAuth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/appointments/:id/cancel -> cancel an appointment
router.patch("/:id/cancel", requireAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    appointment.status = "cancelled";
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
