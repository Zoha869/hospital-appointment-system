import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Navbar({ patient }) {

  const navigate = useNavigate();

  // logout function
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("patient");

    navigate("/login");

  };

  return (

    <div className="navbar">

      <div className="navbar-left">

        <h2>Hello, {patient?.name} 👋</h2>
        <p>Welcome to CareSync</p>

      </div>

      <div className="navbar-right">

        <button
          className="book-btn"
          onClick={() =>
            navigate("/book-appointment")
          }
        >
          Book Appointment
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>

  );

}