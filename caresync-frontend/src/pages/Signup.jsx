import { useState } from "react";
import API from "../api/api";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", form);

      alert("Account Created");

      navigate("/");

    } catch (err) {

      alert(err.response.data.message);

    }
  };

  return (

    <div className="auth-container">

      <form className="auth-box" onSubmit={handleSubmit}>

        <h2>Create Account</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button>Create Account</button>

      </form>

    </div>

  );
}