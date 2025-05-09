const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  specialty: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  qualifications: [{
    degree: String,
    university: String,
    year: Number
  }],
  experience: [{
    position: String,
    hospital: String,
    from: Date,
    to: Date,
    current: Boolean
  }],
  consultationFee: { type: Number, required: true },
  availableSlots: [{
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    startTime: String,
    endTime: String
  }],
  languagesSpoken: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);