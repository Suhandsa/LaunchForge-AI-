import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { initials } from "../../utils/helpers";

export default function Navbar() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");

  return (
    <header
      className="h-[60px] flex items-center gap-4 px-7 sticky top-0 z-40"
      style={{
        background: "rgba(7,9,15,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Search */}
      <div
        className="flex items-center gap-2.5 flex-1 max-w-[380px] px-3.5 py-2 rounded-[10px]"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}
      >
        <Search size={14} color="var(--muted)" className="flex-shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ideas, chats, reports…"
          className="flex-1 bg-transparent border-none outline-none text-[13px] text-[var(--text)] placeholder:text-[var(--muted)]"
        />
        <kbd
          className="text-[10px] px-1.5 py-0.5 rounded text-[var(--muted)]"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2.5">
        {/* AI Status badge */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[var(--success)]"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          <span className="dot-pulse" />
          AI Ready
        </div>

        {/* Notifications */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-[10px] text-[var(--muted)] hover:text-[var(--text)] transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}
        >
          <Bell size={16} />
          <span
            className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--primary)" }}
          />
        </button>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #6366F1, #22D3EE)",
            boxShadow: "0 0 14px rgba(99,102,241,0.3)",
          }}
        >
          {initials(user?.name || "Founder")}
        </div>
      </div>
    </header>
  );
}
