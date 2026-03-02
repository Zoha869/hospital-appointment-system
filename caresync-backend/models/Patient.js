// models/Patient.js
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    contactNumber: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;