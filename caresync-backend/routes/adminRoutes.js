import express from 'express';
import Appointment from '../models/Appointment.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Get all appointments (admin)
router.get('/appointments', adminAuth, async (req, res) => {
  try {
    const appts = await Appointment.find().populate('patient').populate('doctor').sort({ createdAt: -1 });
    res.json(appts);
  } catch (err) {
    console.error('Admin get appointments error', err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Approve appointment
router.put('/appointments/:id/approve', adminAuth, async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true }).populate('patient').populate('doctor');
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appt);
  } catch (err) {
    console.error('Approve error', err);
    res.status(500).json({ error: 'Failed to approve' });
  }
});

// Reschedule appointment (body: { date })
router.put('/appointments/:id/reschedule', adminAuth, async (req, res) => {
  try {
    const { date } = req.body;
    if (!date) return res.status(400).json({ message: 'Date required' });
    const appt = await Appointment.findByIdAndUpdate(req.params.id, { date, status: 'Rescheduled' }, { new: true }).populate('patient').populate('doctor');
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appt);
  } catch (err) {
    console.error('Reschedule error', err);
    res.status(500).json({ error: 'Failed to reschedule' });
  }
});

// Cancel (delete) appointment (admin)
router.delete('/appointments/:id', adminAuth, async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndDelete(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment cancelled by admin' });
  } catch (err) {
    console.error('Admin cancel error', err);
    res.status(500).json({ error: 'Failed to cancel' });
  }
});

export default router;
