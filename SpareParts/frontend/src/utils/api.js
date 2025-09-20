import axios from "axios";

let baseURL;

// If running in development, point directly to backend
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:8080/api";
} else {
  // In production, let nginx handle /api proxy
  baseURL = "/api";
}

const api = axios.create({
  baseURL,
  timeout: 20000,
  withCredentials: true, // optional, in case you use cookies
});

export default api;
