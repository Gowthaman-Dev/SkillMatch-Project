import axios from "axios";

const api = axios.create({
  // In local dev: VITE_BACKEND_URL is empty → relative path → Vite proxy forwards to Render (no CORS)
  // In production (Vercel): VITE_BACKEND_URL=https://skillmatch-project-pllb.onrender.com
  baseURL: import.meta.env.VITE_BACKEND_URL ?? "",
});

export default api;