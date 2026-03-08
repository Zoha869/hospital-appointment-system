import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

/* MongoDB connection */
if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI in environment. Create a .env with MONGO_URI and JWT_SECRET.");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");
})
.catch((err) => {
  console.log("MongoDB Error:", err);
  process.exit(1);
});

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});