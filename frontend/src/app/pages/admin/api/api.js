// api.js
import axios from "axios";

// Use environment variable for API URL
// For Vercel: use empty string (routes are handled by Vercel routing)
// For local dev: use "http://localhost:3000" or set VITE_API_URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 60000
});

export default API;
