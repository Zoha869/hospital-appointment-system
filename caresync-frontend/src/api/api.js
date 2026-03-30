import axios from "axios";

// Environment-based API baseURL
const getBaseURL = () => {
  if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
    // Using Vercel deployment URL
    return "https://hospital-appointment-system-backend.vercel.app/api";
  }
  // Local development
  return import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
};

const API = axios.create({
  baseURL: getBaseURL(),
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  const adminKey = localStorage.getItem("adminKey");
  if (adminKey) {
    req.headers['x-admin-key'] = adminKey;
  }
  return req;
});

export default API;