// routes/appointmentRoutes.js

import express from "express";
import Appointment from "../models/Appointment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/my", auth, async (req, res) => {

  const appointments = await Appointment.find({
    patient: req.user.id
  }).populate("doctor");

  res.json(appointments);

});

// Create appointment
router.post("/", auth, async (req, res) => {
  try {
    const { doctor, date } = req.body;
    const appt = await Appointment.create({
      patient: req.user.id,
      doctor,
      date
    });
    await appt.populate("doctor");
    res.status(201).json(appt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel (delete) appointment
router.delete("/:id", auth, async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });
    if (String(appt.patient) !== String(req.user.id)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    // remove() may not exist depending on mongoose/doc type; use findByIdAndDelete for safety
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;