import { AlertTriangle, Users, Star, TrendingUp, Brain, CheckCircle } from "lucide-react";

const SECTIONS = [
  {
    key:   "problem",
    icon:  AlertTriangle,
    label: "Problem",
    color: "#EF4444",
    bg:    "rgba(239,68,68,0.08)",
    border:"rgba(239,68,68,0.15)",
  },
  {
    key:   "targetUsers",
    icon:  Users,
    label: "Target Users",
    color: "#22D3EE",
    bg:    "rgba(34,211,238,0.08)",
    border:"rgba(34,211,238,0.15)",
  },
  {
    key:   "uniqueValue",
    icon:  Star,
    label: "Unique Value",
    color: "#F59E0B",
    bg:    "rgba(245,158,11,0.08)",
    border:"rgba(245,158,11,0.15)",
  },
  {
    key:   "market",
    icon:  TrendingUp,
    label: "Market Size",
    color: "#10B981",
    bg:    "rgba(16,185,129,0.08)",
    border:"rgba(16,185,129,0.15)",
  },
];

/**
 * IdeaPlanCard — displays the AI-generated plan sections in a 2×2 grid.
 * @param {{ problem, targetUsers, uniqueValue, market }} plan
 */
export default function IdeaPlanCard({ plan }) {
  return (
    <div className="glass-card p-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <Brain size={16} color="#A5B4FC" />
        <h3 className="text-[15px] font-bold text-[var(--text)]">AI Analysis</h3>
        <div
          className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-[var(--success)]"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          <CheckCircle size={11} />
          Complete
        </div>
      </div>

      {/* 2×2 grid */}
      <div className="grid grid-cols-2 gap-3">
        {SECTIONS.map(({ key, icon: Icon, label, color, bg, border }) => (
          <div
            key={key}
            className="hover-lift rounded-xl p-4 cursor-default"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Icon size={12} color={color} />
              <span
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color }}
              >
                {label}
              </span>
            </div>
            <p className="text-[13px] text-[var(--text)] leading-relaxed">
              {plan?.[key] || "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
