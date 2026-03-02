import { createContext, useCallback, useReducer } from "react";

// ── Context ─────────────────────────────────────────────────
export const AuthContext = createContext(null);

// ── Mock user (no backend needed) ───────────────────────────
const MOCK_USER = { name: "Jordan Davis", email: "jordan@stridefit.ai" };

// ── Reducer ─────────────────────────────────────────────────
const initialState = {
  user:    null,
  token:   null,
  isAuth:  false,
  loading: false,
  error:   null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING": return { ...state, loading: true,  error: null };
    case "SUCCESS": return { ...state, loading: false, isAuth: true,  user: action.user, token: "mock-token", error: null };
    case "ERROR":   return { ...state, loading: false, error: action.error };
    case "LOGOUT":  return { ...initialState };
    default:        return state;
  }
}

// ── Provider ────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Mock login — accepts any email/password
  const login = useCallback(async (credentials) => {
    dispatch({ type: "LOADING" });
    await new Promise(r => setTimeout(r, 800)); // simulate network
    dispatch({ type: "SUCCESS", user: { name: "Jordan Davis", email: credentials.email } });
  }, []);

  // Mock register
  const register = useCallback(async (payload) => {
    dispatch({ type: "LOADING" });
    await new Promise(r => setTimeout(r, 800));
    dispatch({ type: "SUCCESS", user: { name: payload.name, email: payload.email } });
  }, []);

  // Logout
  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
