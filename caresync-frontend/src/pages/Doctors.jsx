import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import "../styles/dashboard.css";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [selected, setSelected] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [filterDept, setFilterDept] = useState("");
  const patient = JSON.parse(localStorage.getItem("patient"));

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.log("Error loading doctors", err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      console.log("Error loading departments", err);
    }
  };

  const filteredDoctors = filterDept
    ? doctors.filter((d) => d.department === filterDept)
    : doctors;

  return (
    <div className="dashboard-container">
      <Sidebar patient={patient} />
      <div className="dashboard-main">
        <Navbar patient={patient} />
        <div className="content-section">
          <h1>Our Doctors</h1>

          {/* Department Filter */}
          <div className="filter-section">
            <label>Filter by Department:</label>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctors Grid */}
          <div className="doctor-grid">
            {filteredDoctors.length === 0 && (
              <div className="empty-card">No doctors found</div>
            )}
            {filteredDoctors.map((doc) => (
              <div
                key={doc._id}
                className="doctor-card-large"
                onClick={() => setSelected(doc)}
              >
                <img
                  src={doc.photo || `https://i.pravatar.cc/150?u=${doc._id}`}
                  alt={doc.name}
                />
                <div className="doc-info">
                  <h3>Dr. {doc.name}</h3>
                  <p className="spec">{doc.specialization || "General"}</p>
                  <p className="rating">⭐ {doc.rating || "4.8"}</p>
                  <button className="view-btn">View Details</button>
                </div>
              </div>
            ))}
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
                <p className="spec">{selected.specialization || "General"}</p>
                <p className="rating">⭐ {selected.rating || "4.8"} (Patient Rating)</p>
                <p className="exp">
                  <strong>Experience:</strong> {selected.experience || "10"} years
                </p>
                <p className="bio">
                  {selected.bio ||
                    "Highly qualified and experienced physician with expertise in patient care."}
                </p>
                <p className="fees">
                  <strong>Consultation Fee:</strong> ₹{selected.fees || 500}
                </p>
                <div className="modal-actions">
                  <button className="primary">Book Appointment</button>
                  <button className="secondary" onClick={() => setSelected(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
