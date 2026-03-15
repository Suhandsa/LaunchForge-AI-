import { createContext, useCallback, useEffect, useReducer } from "react";
import { authService } from "../services/authService";
import { getToken, setToken, setUser, getUser, clearToken, clearUser } from "../utils/helpers";

// ── Context ─────────────────────────────────────────────────
export const AuthContext = createContext(null);

// ── Reducer ─────────────────────────────────────────────────
const initialState = {
  user:    null,
  token:   null,
  isAuth:  false,
  loading: true,
  error:   null,
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT":    return { ...state, user: action.user, token: action.token, isAuth: !!action.token, loading: false };
    case "LOADING": return { ...state, loading: true,  error: null };
    case "SUCCESS": return { ...state, loading: false, isAuth: true,  user: action.user, token: action.token, error: null };
    case "ERROR":   return { ...state, loading: false, error: action.error };
    case "LOGOUT":  return { ...initialState, loading: false };
    default:        return state;
  }
}

// ── Provider ────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Initialize auth state on mount (check for stored token)
  useEffect(() => {
    const token = getToken();
    const user = getUser();
    if (token && user) {
      dispatch({ type: "INIT", token, user });
    } else {
      dispatch({ type: "INIT", token: null, user: null });
    }
  }, []);

  // Real login — calls backend API
  const login = useCallback(async (credentials) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await authService.login(credentials);
      dispatch({ type: "SUCCESS", user: response.user, token: response.token });
    } catch (err) {
      const errorMessage = err?.error || err?.message || "Login failed";
      dispatch({ type: "ERROR", error: errorMessage });
      throw err;
    }
  }, []);

  // Real register — calls backend API
  const register = useCallback(async (payload) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await authService.register(payload);
      dispatch({ type: "SUCCESS", user: response.user, token: response.token });
    } catch (err) {
      const errorMessage = err?.error || err?.message || "Registration failed";
      dispatch({ type: "ERROR", error: errorMessage });
      throw err;
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error", err);
    }
    clearToken();
    clearUser();
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

