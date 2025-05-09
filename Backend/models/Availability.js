const mongoose = require("mongoose");

const AvailabilitySchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dayOfWeek: {
      type: Number,
      required: true,
      min: 0, // Sunday
      max: 6, // Saturday
    },
    slots: [
      {
        startTime: {
          type: String,
          required: true,
          match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
        },
        endTime: {
          type: String,
          required: true,
          match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
        },
        isAvailable: {
          type: Boolean,
          default: true,
        },
      },
    ],
    validFrom: {
      type: Date,
      default: Date.now,
    },
    validTo: {
      type: Date,
    },
    isRecurring: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Index for faster queries
AvailabilitySchema.index({ doctor: 1, dayOfWeek: 1 });

module.exports = mongoose.model("Availability", AvailabilitySchema);
