import express from "express";
import Patient from "../models/Patient.js";
import jwt from "jsonwebtoken";

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Patient.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newPatient = new Patient({ name, email, password });
    await newPatient.save();

    res.json({ message: "Registration successful" });
  } catch (err) {
    console.log("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // ✅ Destructure properly

    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: "User not found" });
    }

    if (patient.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const secret = process.env.JWT_SECRET || "dev_jwt_secret_change_me";
    if (!process.env.JWT_SECRET) {
      console.warn("Warning: JWT_SECRET not set — using fallback secret for development");
    }

    const token = jwt.sign(
      { id: patient._id, name: patient.name },
      secret,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      patient: {
        name: patient.name,
        email: patient.email
      }
    });
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;