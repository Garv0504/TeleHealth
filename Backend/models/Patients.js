const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bloodGroup: { type: String },
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    allergies: [{ type: String }],
    medications: [{ type: String }],
    medicalHistory: [
      {
        condition: String,
        diagnosisDate: Date,
        treatment: String,
      },
    ],
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", PatientSchema);
