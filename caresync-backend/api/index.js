import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "../routes/authRoutes.js";
import appointmentRoutes from "../routes/appointmentRoutes.js";
import doctorRoutes from "../routes/doctorRoutes.js";
import departmentRoutes from "../routes/departmentRoutes.js";
import contactRoutes from "../routes/contactRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Endpoint - Root path
app.get("/", (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    message: "Hospital Appointment System Backend is running",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Not Found", 
    path: req.path 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ 
    error: err.message || "Internal Server Error" 
  });
});

// MongoDB Connection (only once)
let mongoConnected = false;

const connectMongo = async () => {
  if (mongoConnected || mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    console.error("Missing MONGO_URI in environment variables");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    mongoConnected = true;
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    mongoConnected = false;
  }
};

// Connect MongoDB on startup
connectMongo();

export default app;
