import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Sidebar({ patient }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("patient");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">CareSync</h2>

      <ul className="sidebar-menu">
        <li onClick={() => navigate("/dashboard")}>
          <span className="icon">🏠</span>
          <span>Dashboard</span>
        </li>
        <li onClick={() => navigate("/appointments")}>
          <span className="icon">📅</span>
          <span>My Appointments</span>
        </li>
        <li onClick={() => navigate("/doctors")}>
          <span className="icon">👨‍⚕️</span>
          <span>Doctors</span>
        </li>
        <li onClick={() => navigate("/messages")}>
          <span className="icon">💬</span>
          <span>Messages</span>
        </li>
        <li onClick={() => navigate("/contact")}>
          <span className="icon">✉️</span>
          <span>Contact</span>
        </li>
        <li onClick={() => {
            const key = localStorage.getItem("adminKey");
            if (key) navigate("/admin");
            else navigate("/admin-login");
          }}>
          <span className="icon">🛠️</span>
          <span>Admin</span>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}