// src/utils/api.js
import axios from "axios";

// Always use Nginx proxy in prod
const baseURL =
  (typeof window !== "undefined" && window.location?.origin
    ? `${window.location.origin}/api`
    : "/api");

const api = axios.create({
  baseURL,
  timeout: 20000,
});

export default api;
