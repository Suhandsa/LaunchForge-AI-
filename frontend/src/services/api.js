import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { getToken, clearToken, clearUser } from "../utils/helpers";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30_000,
});

// ── Request interceptor: attach token ──────────────────────
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log("🔗 API Request:", {
      url: config.url,
      method: config.method,
      token: token ? `✅ "${token.substring(0, 20)}..."` : "❌ No token",
    });
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Authorization header set");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 ──────────────────────
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
      clearUser();
      window.location.href = "/login";
    }
    return Promise.reject(error?.response?.data || error);
  }
);

export default api;
