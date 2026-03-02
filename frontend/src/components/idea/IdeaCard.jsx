import { Lightbulb, Trash2, Star } from "lucide-react";
import { timeAgo, truncate } from "../../utils/helpers";

/**
 * IdeaCard — used in the /ideas list page.
 * @param {{ id, prompt, score, createdAt, favourite }} idea
 * @param {Function} onDelete
 * @param {Function} onFavourite
 * @param {Function} onClick
 */
export default function IdeaCard({ idea, onDelete, onFavourite, onClick }) {
  const scoreColor =
    idea.score >= 80 ? "#10B981"
  : idea.score >= 60 ? "#F59E0B"
  : "#EF4444";

  return (
    <div
      className="glass-card hover-lift p-5 cursor-pointer group"
      onClick={() => onClick?.(idea)}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.25)",
          }}
        >
          <Lightbulb size={16} color="#A5B4FC" />
        </div>

        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onFavourite?.(idea.id); }}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--muted)] hover:text-[#F59E0B] hover:bg-[rgba(245,158,11,0.1)] transition-all"
          >
            <Star size={13} fill={idea.favourite ? "#F59E0B" : "none"} color={idea.favourite ? "#F59E0B" : "currentColor"} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete?.(idea.id); }}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--muted)] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.1)] transition-all"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Prompt */}
      <p className="text-[14px] font-semibold text-[var(--text)] leading-snug mb-1">
        {truncate(idea.prompt, 72)}
      </p>
      <p className="text-[12px] text-[var(--muted)] mb-4">
        {timeAgo(idea.createdAt)}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div
          className="text-[11px] px-2 py-0.5 rounded-md font-medium"
          style={{ color: scoreColor, background: `${scoreColor}15` }}
        >
          Score {idea.score}
        </div>
        <span className="text-[11px] text-[var(--muted)]">View plan →</span>
      </div>
    </div>
  );
}
