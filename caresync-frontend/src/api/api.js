import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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