import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Get all doctors (with optional department filter)
router.get('/', async (req, res) => {
  try {
    const { department } = req.query;
    const filter = department ? { department } : {};
    const doctors = await Doctor.find(filter);
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;