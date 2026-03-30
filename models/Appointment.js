// models/appointment.js

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },

  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },

  date: Date,

  status: {
    type: String,
    default: "Upcoming"
  }

}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);