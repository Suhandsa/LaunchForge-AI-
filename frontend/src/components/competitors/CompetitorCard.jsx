/**
 * CompetitorCard — single competitor analysis card.
 * @param {{ name, logo, color, pricing, strengths, weaknesses, score }} competitor
 */
export default function CompetitorCard({ competitor: c }) {
  return (
    <div
      className="glass-card hover-lift p-5 cursor-default"
      style={{ transition: "all 0.25s ease" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${c.color}40`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {/* Top */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xs font-extrabold flex-shrink-0"
          style={{
            background: `${c.color}18`,
            border: `1px solid ${c.color}35`,
            color: c.color,
            fontFamily: "Syne, sans-serif",
          }}
        >
          {c.logo}
        </div>
        <div className="overflow-hidden">
          <p className="text-[14px] font-bold text-[var(--text)] truncate" style={{ fontFamily: "Syne, sans-serif" }}>
            {c.name}
          </p>
          <p className="text-[12px] text-[var(--muted)]">{c.pricing}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xl font-extrabold leading-none" style={{ color: c.color, fontFamily: "Syne, sans-serif" }}>
            {c.score}
          </p>
          <p className="text-[10px] text-[var(--muted)]">score</p>
        </div>
      </div>

      {/* Score bar */}
      <div
        className="h-[3px] rounded-full mb-4"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${c.score}%`, background: `linear-gradient(90deg, ${c.color}, ${c.color}60)` }}
        />
      </div>

      {/* Strengths / Weaknesses */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] font-semibold text-[var(--success)] uppercase tracking-widest mb-2">
            Strengths
          </p>
          {Array.isArray(c?.strengths) && c.strengths.map((s) => (
            <div key={s} className="flex items-start gap-1 mb-1">
              <span className="text-[var(--success)] text-sm leading-none mt-0.5">+</span>
              <span className="text-[11px] text-[var(--text)] leading-snug">{s}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[10px] font-semibold text-[#EF4444] uppercase tracking-widest mb-2">
            Weaknesses
          </p>
          {Array.isArray(c?.weaknesses) && c.weaknesses.map((w) => (
            <div key={w} className="flex items-start gap-1 mb-1">
              <span className="text-[#EF4444] text-sm leading-none mt-0.5">−</span>
              <span className="text-[11px] text-[var(--text)] leading-snug">{w}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
