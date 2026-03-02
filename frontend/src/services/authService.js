import api from "./api";
import { setToken, setUser, clearToken, clearUser } from "../utils/helpers";

export const authService = {
  /**
   * POST /auth/login
   * @param {{ email: string, password: string }} credentials
   */
  async login(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    setToken(data.token);
    setUser(data.user);
    return data;
  },

  /**
   * POST /auth/register
   * @param {{ name: string, email: string, password: string }} payload
   */
  async register(payload) {
    const { data } = await api.post("/auth/register", payload);
    setToken(data.token);
    setUser(data.user);
    return data;
  },

  /**
   * POST /auth/logout
   */
  async logout() {
    try { await api.post("/auth/logout"); } catch { /* silent */ }
    clearToken();
    clearUser();
  },

  /**
   * GET /auth/me
   */
  async me() {
    const { data } = await api.get("/auth/me");
    setUser(data);
    return data;
  },
};
