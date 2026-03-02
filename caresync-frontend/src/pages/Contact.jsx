import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import "../styles/dashboard.css";

export default function Contact() {
  const patient = JSON.parse(localStorage.getItem("patient"));
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/contact", form);
      setStatus("Your message has been sent. We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar patient={patient} />
      <div className="dashboard-main">
        <Navbar patient={patient} />
        <div className="section">
          <h2>Contact Us</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </label>
            <button type="submit" className="submit-btn">
              Send
            </button>
          </form>
          {status && <p className="status-msg">{status}</p>}
        </div>
      </div>
    </div>
  );
}
