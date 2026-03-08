import express from "express";
import Department from "../models/Department.js";

const router = express.Router();

// Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get department by ID
router.get("/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
