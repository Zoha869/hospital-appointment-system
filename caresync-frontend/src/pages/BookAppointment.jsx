import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

export default function BookAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    department: location.state?.departmentId || "",
    doctor: location.state?.doctorId || "",
    date: "",
    time: "09:00",
    day: "",
  });
  const [loading, setLoading] = useState(false);
  const patient = JSON.parse(localStorage.getItem("patient"));

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (form.department) {
      fetchDoctorsForDept(form.department);
    } else {
      setDoctors([]);
    }
  }, [form.department]);

  useEffect(() => {
    if (form.date) {
      const selectedDate = new Date(form.date);
      const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
      setForm((prev) => ({ ...prev, day: dayName }));
    }
  }, [form.date]);

  const fetchDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      console.log("Failed to load departments", err);
    }
  };

  const fetchDoctorsForDept = async (deptId) => {
    try {
      const res = await API.get(`/doctors?department=${deptId}`);
      console.log("Doctors for dept:", res.data);
      setDoctors(res.data);
    } catch (err) {
      console.log("Failed to load doctors", err);
      setDoctors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.doctor || !form.date || !form.time) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const dateTime = new Date(`${form.date}T${form.time}`);
      const res = await API.post("/appointments", {
        doctor: form.doctor,
        date: dateTime.toISOString(),
      });
      alert("✅ Appointment Booked Successfully!\nReference: " + res.data._id);
      navigate("/appointments");
    } catch (err) {
      alert("❌ Booking Failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar patient={patient} />
      <div className="dashboard-main">
        <Navbar patient={patient} />
        <div className="content-section">
          <h1>📅 Book Your Appointment</h1>
          <div className="book-form-container">
            <form onSubmit={handleSubmit} className="book-form">
              {/* Step 1: Department */}
              <div className="form-group">
                <label htmlFor="dept">
                  <strong>Step 1: Select Department</strong>
                </label>
                <select
                  id="dept"
                  required
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value, doctor: "" })
                  }
                  className="form-input"
                >
                  <option value="">Choose Department...</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Doctor */}
              {form.department && (
                <div className="form-group">
                  <label htmlFor="doctor">
                    <strong>Step 2: Select Doctor</strong>
                  </label>
                  {doctors.length === 0 ? (
                    <div style={{ color: "red", padding: "8px" }}>
                      ⚠️ No doctors available for this department
                    </div>
                  ) : (
                    <select
                      id="doctor"
                      required
                      value={form.doctor}
                      onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                      className="form-input"
                    >
                      <option value="">Choose Doctor...</option>
                      {doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>
                          Dr. {doc.name} ⭐ {doc.rating || 4.8} - ₹{doc.fees || 500}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              {/* Step 3: Date */}
              {form.doctor && (
                <div className="form-group">
                  <label htmlFor="date">
                    <strong>Step 3: Select Date</strong>
                  </label>
                  <input
                    id="date"
                    type="date"
                    required
                    value={form.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="form-input"
                  />
                </div>
              )}

              {/* Step 4: Time */}
              {form.date && (
                <div className="form-group">
                  <label htmlFor="time">
                    <strong>Step 4: Select Time</strong>
                  </label>
                  <select
                    id="time"
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="form-input"
                  >
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                </div>
              )}

              {/* Display Summary */}
              {form.date && form.time && (
                <div className="booking-summary">
                  <h4>📋 Your Appointment Summary</h4>
                  <p>
                    <strong>Department:</strong>{" "}
                    {departments.find((d) => d._id === form.department)?.name}
                  </p>
                  <p>
                    <strong>Doctor:</strong>{" "}
                    {doctors.find((d) => d._id === form.doctor)?.name &&
                      `Dr. ${doctors.find((d) => d._id === form.doctor).name}`}
                  </p>
                  <p>
                    <strong>Date & Day:</strong> {form.date} ({form.day})
                  </p>
                  <p>
                    <strong>Time:</strong> {form.time}
                  </p>
                  <p>
                    <strong>Fee:</strong> ₹
                    {doctors.find((d) => d._id === form.doctor)?.fees || 500}
                  </p>
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="primary" disabled={loading || !form.date || !form.time}>
                  {loading ? "🔄 Booking..." : "✅ Confirm Booking"}
                </button>
                <button type="button" className="secondary" onClick={() => navigate("/dashboard")}>
                  ❌ Cancel
                </button>
              </div>
            </form>

            <div className="info-card">
              <h3>ℹ️ Important Information</h3>
              <ul>
                <li>✅ Appointments can be booked up to 30 days in advance</li>
                <li>✅ You can cancel up to 24 hours before appointment</li>
                <li>✅ Arrive 10 minutes early for your appointment</li>
                <li>✅ Video consultation available for selected doctors</li>
                <li>✅ Get prescription and reports digitally</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}