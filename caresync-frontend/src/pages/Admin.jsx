import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import "../styles/dashboard.css";

export default function Admin() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    const storedKey = localStorage.getItem("adminKey");
    if (!storedKey) {
      // nothing to try – send back to login
      navigate("/admin-login");
      return;
    }
    fetchAdminAppointments();
  }, []);

  const handleAuthError = (err) => {
    const status = err.response?.status;
    if (status === 401 || status === 403) {
      // invalid key
      localStorage.removeItem("adminKey");
      navigate("/admin-login");
      return true;
    }
    return false;
  };

  const fetchAdminAppointments = async () => {
    try {
      const res = await API.get("/admin/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error("Admin fetch error", err.response || err);
      if (handleAuthError(err)) return;
      alert(err.response?.data?.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    try {
      const res = await API.put(`/admin/appointments/${id}/approve`);
      setAppointments((prev) => prev.map((a) => (a._id === id ? res.data : a)));
    } catch (err) {
      console.error(err.response || err);
      if (handleAuthError(err)) return;
      alert(err.response?.data?.message || "Failed to approve");
    }
  };

  const cancel = async (id) => {
    if (!confirm("Cancel this appointment?")) return;
    try {
      await API.delete(`/admin/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err.response || err);
      if (handleAuthError(err)) return;
      alert(err.response?.data?.message || "Failed to cancel");
    }
  };

  const startReschedule = (id) => {
    setRescheduleId(id);
    setNewDate("");
  };

  const submitReschedule = async () => {
    if (!newDate) return alert("Select a date and time");
    try {
      const res = await API.put(`/admin/appointments/${rescheduleId}/reschedule`, { date: newDate });
      setAppointments((prev) => prev.map((a) => (a._id === rescheduleId ? res.data : a)));
      setRescheduleId(null);
      setNewDate("");
    } catch (err) {
      console.error(err.response || err);
      if (handleAuthError(err)) return;
      alert(err.response?.data?.message || "Failed to reschedule");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar patient={null} />
      <div className="dashboard-main">
        <Navbar patient={null} />
        <div className="content-section">
          <h1>Admin — Manage Appointments</h1>
          {loading ? (
            <p>Loading...</p>
          ) : appointments.length === 0 ? (
            <div className="empty-card">No appointments</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt._id}>
                    <td>Dr. {appt?.doctor?.name || "Unknown"}</td>
                    <td>{appt?.patient?.name || appt?.patient?.email || "Unknown"}</td>
                    <td>{new Date(appt.date).toLocaleString()}</td>
                    <td>{appt.status}</td>
                    <td>
                      <button className="view-btn" onClick={() => approve(appt._id)}>Approve</button>
                      <button className="slip-btn" onClick={() => startReschedule(appt._id)}>Reschedule</button>
                      <button className="cancel-btn" onClick={() => cancel(appt._id)}>Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {rescheduleId && (
            <div className="section">
              <h3>Reschedule Appointment</h3>
              <input type="datetime-local" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
              <div style={{ marginTop: 8 }}>
                <button className="primary" onClick={submitReschedule}>Update</button>
                <button className="secondary" onClick={() => setRescheduleId(null)}>Cancel</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
