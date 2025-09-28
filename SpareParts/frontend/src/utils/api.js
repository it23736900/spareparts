import axios from "axios";

// Always use same-origin (works in prod & dev behind proxy)
const baseURL =
  typeof window !== "undefined"
    ? `${window.location.origin}/api`
    : "https://eurotec.lk/api"; // ✅ fallback for server-side

const api = axios.create({
  baseURL,
  withCredentials: true,   // allow cookies
});

export default api;
