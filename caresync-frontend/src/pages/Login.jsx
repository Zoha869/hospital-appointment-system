import { useState } from "react";
import API from "../api/api";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // handle input change
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // handle login submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", form);

      // save token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // save patient info (IMPORTANT)
      localStorage.setItem(
        "patient",
        JSON.stringify(res.data.patient)
      );

      alert("Login Successful");

      // redirect dashboard
      navigate("/dashboard");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-box"
        onSubmit={handleSubmit}
      >

        <h2>CareSync Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Create Account
        </p>

      </form>

    </div>

  );

}