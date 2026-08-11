const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String }, // present only for full appointment form
    time: { type: String }, // present only for full appointment form
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
