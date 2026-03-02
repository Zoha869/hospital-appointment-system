import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selected, setSelected] = useState(null);

  const patient = JSON.parse(localStorage.getItem("patient"));

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [apptRes, docRes, deptRes] = await Promise.all([
        API.get("/appointments/my"),
        API.get("/doctors"),
        API.get("/departments"),
      ]);
      setAppointments(apptRes.data);
      setDoctors(docRes.data);
      setDepartments(deptRes.data);
    } catch (err) {
      console.log("Error loading data", err);
    }
  };

  const cancelAppointment = async (id) => {
    if (!confirm("Cancel this appointment?")) return;
    try {
      await API.delete(`/appointments/${id}`);
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Cancel error:", err.response || err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Cancel failed";
      alert(msg);
    }
  };

  const upcomingAppt = appointments.length > 0 ? appointments[0] : null;
  const topDoctors = doctors.slice(0, 4);

  const reviews = [
    { name: "Dr. Ahmed Khan", rating: 5, text: "Excellent service and caring doctors!" },
    { name: "Dr. Ayesha Ali", rating: 5, text: "Very professional and clean facility." },
    { name: "Dr. Salman Ahmed", rating: 4, text: "Great experience overall." },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar patient={patient} />

      <div className="dashboard-main">
        <Navbar patient={patient} />

        {/* Hero Section */}
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {patient?.name}!</h1>
            <p>Manage your health with ease</p>
          </div>
          <button className="book-btn" onClick={() => navigate("/book-appointment")}>
            + Book Appointment
          </button>
        </div>

        {/* Hospital Info */}
        <div className="hospital-info">
          <h2>CareSync Hospital</h2>
          <p>Award-winning healthcare facility with state-of-the-art equipment and compassionate professionals.</p>
          <div className="hospital-stats">
            <div className="stat">
              <strong>500+</strong>
              <span>Doctors</span>
            </div>
            <div className="stat">
              <strong>15</strong>
              <span>Departments</span>
            </div>
            <div className="stat">
              <strong>50K+</strong>
              <span>Happy Patients</span>
            </div>
          </div>
        </div>

        {/* Departments Section */}
        <div className="section">
          <h2>Our Departments</h2>
          <div className="departments-grid">
            {departments.length === 0 ? (
              <div className="empty-card">No departments found</div>
            ) : (
              departments.slice(0, 6).map((dept) => (
                <div key={dept._id} className="dept-card">
                  <div className="dept-icon">🏥</div>
                  <h4>{dept.name}</h4>
                  <p>{dept.description || "Quality healthcare"}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Appointment */}
        {upcomingAppt && (
          <div className="section">
            <h2>Your Next Appointment</h2>
            <div className="appointment-card">
              <img
                src={upcomingAppt?.doctor?.photo || `https://i.pravatar.cc/80?u=${upcomingAppt?.doctor?._id}`}
                alt={upcomingAppt?.doctor?.name || "Doctor"}
              />
              <div className="appt-details">
                <h3>Dr. {upcomingAppt?.doctor?.name || "Unknown"}</h3>
                <p className="spec">{upcomingAppt?.doctor?.specialization || ""}</p>
                <p className="date">📅 {new Date(upcomingAppt.date).toLocaleString()}</p>
              </div>
              <div className="appt-actions">
                <button className="join-btn">Join Video Call</button>
                <button
                  className="cancel-btn"
                  onClick={() => cancelAppointment(upcomingAppt._id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Featured Doctors */}
        <div className="section">
          <h2>Our Top Doctors</h2>
          <div className="doctor-grid">
            {topDoctors.length === 0 ? (
              <div className="empty-card">No doctors found</div>
            ) : (
              topDoctors.map((doc) => (
                <div key={doc._id} className="doctor-card" onClick={() => setSelected(doc)}>
                  <img
                    src={doc.photo || `https://i.pravatar.cc/150?u=${doc._id}`}
                    alt={doc.name}
                  />
                  <div className="doc-info">
                    <h3>Dr. {doc.name}</h3>
                    <p className="spec">{doc.specialization || "General"}</p>
                    <p className="rating">⭐ {doc.rating || "4.8"}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="section">
          <h2>Patient Reviews</h2>
          <div className="reviews-grid">
            {reviews.map((review, idx) => (
              <div key={idx} className="review-card">
                <p className="rating">{"⭐".repeat(review.rating)}</p>
                <p className="text">"{review.text}"</p>
                <p className="author">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Detail Modal */}
        {selected && (
          <div className="modal" onClick={() => setSelected(null)}>
            <div className="modal-body" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelected(null)}>
                ×
              </button>
              <img
                src={selected.photo || `https://i.pravatar.cc/180?u=${selected._id}`}
                alt={selected.name}
              />
              <h3>Dr. {selected.name}</h3>
              <p className="spec">{selected.specialization || "General Medicine"}</p>
              <p className="rating">⭐ {selected.rating || "4.8"} Rating</p>
              <p className="exp">
                <strong>Experience:</strong> {selected.experience || "10"} years
              </p>
              <p className="bio">
                {selected.bio || "Experienced physician with compassionate approach."}
              </p>
              <p className="fees">
                <strong>Consultation Fee:</strong> ₹{selected.fees || 500}
              </p>
              <div className="modal-actions">
                <button
                  className="primary"
                  onClick={() => {
                    navigate("/book-appointment", { state: { doctorId: selected._id } });
                    setSelected(null);
                  }}
                >
                  Book Appointment
                </button>
                <button className="secondary" onClick={() => setSelected(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}