// src/utils/api.js
import axios from "axios";

// CRA / plain React env variables must start with REACT_APP_*
// Prefer an explicit env var for the API base URL, but fall back to
// a relative "/api" path so deployed builds don't accidentally call
// localhost. This lets the frontend talk to whatever host serves it
// without hard-coding development URLs.
const baseURL = process.env.REACT_APP_API_URL || "/api";

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
