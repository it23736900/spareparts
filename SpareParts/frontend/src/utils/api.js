import axios from "axios";
const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("sp_user");
  if (raw) {
    const { accessToken } = JSON.parse(raw);
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default api;
