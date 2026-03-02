// ── Token helpers ───────────────────────────────────────────
import { STORAGE_KEYS } from "./constants";

export const setToken  = (token) => localStorage.setItem(STORAGE_KEYS.token, token);
export const getToken  = ()      => localStorage.getItem(STORAGE_KEYS.token);
export const clearToken = ()     => localStorage.removeItem(STORAGE_KEYS.token);

export const setUser  = (user)   => localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
export const getUser  = ()       => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.user)); }
  catch { return null; }
};
export const clearUser = ()      => localStorage.removeItem(STORAGE_KEYS.user);

// ── String helpers ──────────────────────────────────────────
export const truncate = (str, n = 80) =>
  str.length > n ? str.slice(0, n) + "…" : str;

export const initials = (name = "") =>
  name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

// ── Date helpers ────────────────────────────────────────────
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const timeAgo = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60000);
  if (mins < 1)   return "just now";
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs  < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

// ── Number helpers ──────────────────────────────────────────
export const formatNumber = (n) =>
  n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M`
: n >= 1_000     ? `${(n/1_000).toFixed(1)}K`
: String(n);

// ── Class name helper ───────────────────────────────────────
export const cx = (...classes) => classes.filter(Boolean).join(" ");

// ── Validate email ──────────────────────────────────────────
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ── Sleep ───────────────────────────────────────────────────
export const sleep = (ms) => new Promise(r => setTimeout(r, ms));
