// models/Doctor.js
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    department: { type: String, required: true },
    photo: { type: String },
    bio: { type: String },
    experience: { type: Number },
    fees: { type: Number },
    availableSlots: [String],
    rating: { type: Number, default: 5 }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor; // ✅ ES module export