import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// create a new contact message
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Message received" });
  } catch (err) {
    console.error("Contact error", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// optional: list messages (for admin/debug)
router.get("/", async (req, res) => {
  try {
    const msgs = await Contact.find().sort({ date: -1 });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
