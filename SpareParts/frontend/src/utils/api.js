// src/utils/api.js
import axios from "axios";

// Always use same-origin (works in prod & dev behind proxy)
const baseURL =
  typeof window !== "undefined"
    ? `${window.location.origin}/api`
    : "http://72.60.97.47/api";  // fallback for server-side

const api = axios.create({ baseURL });

export default api;
