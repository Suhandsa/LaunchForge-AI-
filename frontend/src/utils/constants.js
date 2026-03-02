// ── Design Tokens ──────────────────────────────────────────
export const COLORS = {
  bg:          "#07090F",
  surface:     "#0D1117",
  card:        "#111827",
  primary:     "#6366F1",
  primaryGlow: "rgba(99,102,241,0.3)",
  accent:      "#22D3EE",
  accentGlow:  "rgba(34,211,238,0.2)",
  success:     "#10B981",
  warning:     "#F59E0B",
  danger:      "#EF4444",
  text:        "#E5E7EB",
  muted:       "#6B7280",
  border:      "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.15)",
};

// ── API ────────────────────────────────────────────────────
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// ── Navigation ─────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",  path: "/" },
  { id: "ideas",     label: "Ideas",      path: "/ideas" },
  { id: "chat",      label: "AI Chat",    path: "/chat" },
  { id: "pitch",     label: "Pitch Deck", path: "/pitch" },
  { id: "settings",  label: "Settings",   path: "/settings" },
];

// ── Idea score metrics ─────────────────────────────────────
export const SCORE_METRICS = [
  "Market Demand",
  "Competition",
  "Profit Potential",
  "Difficulty",
  "Success Probability",
];

// ── Pitch slide labels ─────────────────────────────────────
export const PITCH_LABELS = ["Problem", "Solution", "Market", "Revenue", "Competition", "Ask"];

// ── Local storage keys ─────────────────────────────────────
export const STORAGE_KEYS = {
  token: "sf_token",
  user:  "sf_user",
};

// ── Mock example prompts ───────────────────────────────────
export const EXAMPLE_PROMPTS = [
  "AI fitness app for students",
  "Marketplace for campus services",
  "AI tutor for med students",
  "Subscription box for remote workers",
  "B2B SaaS for restaurant inventory",
];
