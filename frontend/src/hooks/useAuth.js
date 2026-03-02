import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * useAuth — access auth state and actions from anywhere.
 *
 * @returns {{ user, token, isAuth, loading, error, login, register, logout }}
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
