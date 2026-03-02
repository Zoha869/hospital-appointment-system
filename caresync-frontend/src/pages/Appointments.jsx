import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import "../styles/dashboard.css";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const patient = JSON.parse(localStorage.getItem("patient"));

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/my");
      setAppointments(res.data);
    } catch (err) {
      console.log("Error loading appointments", err);
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

  return (
    <div className="dashboard-container">
      <Sidebar patient={patient} />
      <div className="dashboard-main">
        <Navbar patient={patient} />
        <div className="content-section">
          <h1>My Appointments</h1>
          {appointments.length === 0 ? (
            <div className="empty-card">No appointments found</div>
          ) : (
            <div className="appointments-list">
              {appointments.map((appt) => (
                <div key={appt._id} className="appointment-item">
                  <img
                    src={appt?.doctor?.photo || `https://i.pravatar.cc/100?u=${appt?.doctor?._id}`}
                    alt={appt?.doctor?.name || "Doctor"}
                  />
                  <div className="appointment-info">
                    <h3>Dr. {appt?.doctor?.name || "Unknown"}</h3>
                    <p className="spec">{appt?.doctor?.specialization || "General"}</p>
                    <p className="date">📅 {new Date(appt.date).toLocaleString()}</p>
                    <p className="status">Status: {appt.status}</p>
                  </div>
                  <div className="appointment-actions">
                    <button className="join-btn">Join Call</button>
                    <button
                      className="cancel-btn"
                      onClick={() => cancelAppointment(appt._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
