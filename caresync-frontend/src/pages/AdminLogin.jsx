import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/auth.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [key, setKey] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!key) return;
    // store key candidate and test it against backend
    localStorage.setItem("adminKey", key);
    try {
      // a simple request that requires admin auth
      await API.get("/admin/appointments");
      navigate("/admin");
    } catch (err) {
      console.error("Admin key validation failed", err.response || err);
      localStorage.removeItem("adminKey");
      alert(err.response?.data?.message || "Invalid admin key");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <p>Please enter your administrator key.</p>
        <input
          type="password"
          placeholder="Admin Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
        />
        <small style={{ display: 'block', marginTop: 4, color: '#666' }}>
          (default key is <code>zoha123</code>)
        </small>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
