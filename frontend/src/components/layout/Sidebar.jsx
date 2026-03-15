import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Lightbulb, MessageSquare,
  Presentation, Settings, Brain, Menu,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { initials } from "../../utils/helpers";

const NAV = [
  { to: "/",        icon: LayoutDashboard, label: "Dashboard" },
  { to: "/ideas",   icon: Lightbulb,       label: "Ideas"     },
  { to: "/chat",    icon: MessageSquare,   label: "AI Chat"   },
  { to: "/pitch",   icon: Presentation,    label: "Pitch Deck"},
  { to: "/settings",icon: Settings,        label: "Settings"  },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { user } = useAuth();

  return (
    <aside
      style={{
        width: collapsed ? "68px" : "240px",
        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
        background: "rgba(10,13,20,0.95)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        inset: "0 auto 0 0",
        zIndex: 50,
      }}
    >
      {/* Logo row */}
      <div
        className="flex items-center gap-2.5 px-4 py-5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="flex-shrink-0 w-9 h-9 rounded-[10px] flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #6366F1, #22D3EE)",
            boxShadow: "0 0 20px rgba(99,102,241,0.4)",
          }}
        >
          <Brain size={18} color="white" />
        </div>

        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-[15px] font-bold leading-none text-[var(--text)]" style={{ fontFamily: "Syne, sans-serif" }}>
              LaunchForge-AI
            </p>
            <p className="text-[10px] text-[var(--muted)] mt-0.5 tracking-widest uppercase">
              AI Platform
            </p>
          </div>
        )}

        <button
          onClick={onToggle}
          className="ml-auto text-[var(--muted)] hover:text-[var(--text)] transition-colors p-1 rounded-md hover:bg-white/5"
        >
          <Menu size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 p-2 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `nav-item flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-sm font-medium
              ${isActive ? "active" : "text-[var(--muted)]"}
              ${collapsed ? "justify-center" : ""}`
            }
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      {!collapsed && (
        <div className="p-3" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-[13px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, #6366F1, #22D3EE)" }}
            >
              {initials(user?.name || "Jordan Davis")}
            </div>
            <div className="overflow-hidden">
              <p className="text-[13px] font-semibold text-[var(--text)] truncate">
                {user?.name || "Founder"}
              </p>
              <p className="text-[11px] text-[var(--muted)]">Pro Plan</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
