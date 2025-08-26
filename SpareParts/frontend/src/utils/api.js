// src/utils/api.js
import axios from "axios";

// CRA / plain React env variables must start with REACT_APP_*
const baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("sp_user");
    if (raw) {
      const { accessToken } = JSON.parse(raw);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  } catch (e) {
    console.warn("Failed to parse sp_user from localStorage", e);
  }
  return config;
});

export default api;
