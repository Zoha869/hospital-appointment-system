import mongoose from "mongoose";
import dotenv from "dotenv";
import Department from "./models/Department.js";
import Doctor from "./models/Doctor.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB ✅");

    // Clear existing data
    await Department.deleteMany({});
    await Doctor.deleteMany({});

    // Seed departments
    const departments = await Department.insertMany([
      { name: "Cardiology", description: "Heart and cardiovascular diseases" },
      { name: "Neurology", description: "Brain and nervous system disorders" },
      { name: "Orthopedics", description: "Bone and joint disorders" },
      { name: "Dentistry", description: "Dental and oral health" },
      { name: "Pediatrics", description: "Children's health and medicine" },
      { name: "Dermatology", description: "Skin diseases and treatment" },
      { name: "Gastroenterology", description: "Digestive system disorders" },
      { name: "Ophthalmology", description: "Eye and vision care" },
    ]);

    console.log("✅ Departments seeded:", departments.length);

    // Seed doctors
    const doctors = await Doctor.insertMany([
      {
        name: "Dr. Ahmed Khan",
        specialization: "Cardiologist",
        department: departments[0]._id,
        photo: "https://randomuser.me/api/portraits/men/32.jpg?nat=pk",
        bio: "Expert cardiologist with 15+ years of experience in heart surgery.",
        experience: 15,
        fees: 800,
        rating: 4.9,
        availableSlots: ["09:00", "10:00", "14:00", "16:00"],
      },
      {
        name: "Dr. Muhammad Hussain",
        specialization: "Cardiologist",
        department: departments[0]._id,
        photo: "https://randomuser.me/api/portraits/men/45.jpg?nat=pk",
        bio: "Senior cardiologist specializing in interventional procedures.",
        experience: 20,
        fees: 850,
        rating: 4.8,
        availableSlots: ["10:00", "11:00", "15:00"],
      },
      {
        name: "Dr. Ayesha Ali",
        specialization: "Neurologist",
        department: departments[1]._id,
        photo: "https://randomuser.me/api/portraits/women/44.jpg?nat=pk",
        bio: "Leading neurologist specializing in brain disorders and epilepsy.",
        experience: 12,
        fees: 700,
        rating: 4.8,
        availableSlots: ["08:30", "11:00", "15:00"],
      },
      {
        name: "Dr. Asad Qureshi",
        specialization: "Neurologist",
        department: departments[1]._id,
        photo: "https://randomuser.me/api/portraits/men/55.jpg?nat=pk",
        bio: "Expert in stroke and neurovascular conditions.",
        experience: 14,
        fees: 720,
        rating: 4.7,
        availableSlots: ["09:00", "13:00", "16:00"],
      },
      {
        name: "Dr. Imran Zafar",
        specialization: "Orthopedic Surgeon",
        department: departments[2]._id,
        photo: "https://randomuser.me/api/portraits/men/60.jpg?nat=pk",
        bio: "Renowned orthopedic specialist with expertise in joint reconstruction.",
        experience: 18,
        fees: 900,
        rating: 4.7,
        availableSlots: ["09:30", "13:00", "16:30"],
      },
      {
        name: "Dr. Sana Mir",
        specialization: "Orthopedic Surgeon",
        department: departments[2]._id,
        photo: "https://randomuser.me/api/portraits/women/65.jpg?nat=pk",
        bio: "Specializes in sports injuries and arthroscopic surgery.",
        experience: 13,
        fees: 880,
        rating: 4.8,
        availableSlots: ["10:30", "14:30", "17:00"],
      },
      {
        name: "Dr. Fatima Zahra",
        specialization: "Dentist",
        department: departments[3]._id,
        photo: "https://randomuser.me/api/portraits/women/22.jpg?nat=pk",
        bio: "Expert in cosmetic and restorative dentistry with modern techniques.",
        experience: 10,
        fees: 500,
        rating: 4.9,
        availableSlots: ["10:00", "14:00", "17:00"],
      },
      {
        name: "Dr. Bilal Siddiqui",
        specialization: "Dentist",
        department: departments[3]._id,
        photo: "https://randomuser.me/api/portraits/men/23.jpg?nat=pk",
        bio: "Specialist in pediatric dentistry and oral surgery.",
        experience: 12,
        fees: 520,
        rating: 4.7,
        availableSlots: ["09:00", "11:00", "15:00"],
      },
      {
        name: "Dr. Omar Farooq",
        specialization: "Pediatrician",
        department: departments[4]._id,
        photo: "https://randomuser.me/api/portraits/men/71.jpg?nat=pk",
        bio: "Compassionate pediatrician dedicated to child health and development.",
        experience: 11,
        fees: 600,
        rating: 4.8,
        availableSlots: ["09:00", "11:30", "14:30"],
      },
      {
        name: "Dr. Nadia Khan",
        specialization: "Pediatrician",
        department: departments[4]._id,
        photo: "https://randomuser.me/api/portraits/women/54.jpg?nat=pk",
        bio: "Experienced pediatrician focused on preventive care and immunizations.",
        experience: 13,
        fees: 620,
        rating: 4.9,
        availableSlots: ["10:00", "12:30", "15:00"],
      },
      {
        name: "Dr. Mahnoor Khan",
        specialization: "Dermatologist",
        department: departments[5]._id,
        photo: "https://randomuser.me/api/portraits/women/88.jpg?nat=pk",
        bio: "Skincare expert treating acne, psoriasis, and cosmetic concerns.",
        experience: 9,
        fees: 550,
        rating: 4.7,
        availableSlots: ["10:00", "13:00", "15:30"],
      },
      {
        name: "Dr. Salman Ahmed",
        specialization: "Dermatologist",
        department: departments[5]._id,
        photo: "https://randomuser.me/api/portraits/men/77.jpg?nat=pk",
        bio: "Dermatology expert in laser treatment and skin rejuvenation.",
        experience: 10,
        fees: 580,
        rating: 4.8,
        availableSlots: ["09:30", "12:00", "14:30"],
      },
      {
        name: "Dr. Rizwan Ali",
        specialization: "Gastroenterologist",
        department: departments[6]._id,
        photo: "https://randomuser.me/api/portraits/men/34.jpg?nat=pk",
        bio: "Specialist in digestive disorders and endoscopic procedures.",
        experience: 14,
        fees: 750,
        rating: 4.8,
        availableSlots: ["08:00", "12:00", "16:00"],
      },
      {
        name: "Dr. Zafar Iqbal",
        specialization: "Gastroenterologist",
        department: departments[6]._id,
        photo: "https://randomuser.me/api/portraits/men/39.jpg?nat=pk",
        bio: "Gastroenterologist with a focus on inflammatory bowel diseases.",
        experience: 12,
        fees: 760,
        rating: 4.7,
        availableSlots: ["10:00", "13:00", "15:00"],
      },
      {
        name: "Dr. Hina Shah",
        specialization: "Ophthalmologist",
        department: departments[7]._id,
        photo: "https://randomuser.me/api/portraits/women/52.jpg?nat=pk",
        bio: "Eye care specialist with expertise in cataract and LASIK surgery.",
        experience: 16,
        fees: 700,
        rating: 4.9,
        availableSlots: ["09:00", "13:00", "17:00"],
      },
      {
        name: "Dr. Mariam Malik",
        specialization: "Ophthalmologist",
        department: departments[7]._id,
        photo: "https://randomuser.me/api/portraits/women/67.jpg?nat=pk",
        bio: "Specialist in pediatric ophthalmology and retina disorders.",
        experience: 14,
        fees: 720,
        rating: 4.8,
        availableSlots: ["11:00", "14:00", "16:30"],
      },
    ]);

    console.log("✅ Doctors seeded:", doctors.length);
    console.log("✨ Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();
