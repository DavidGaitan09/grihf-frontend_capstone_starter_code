const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },
    specialty: { type: String, default: "" }, // used when role === "doctor"
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
