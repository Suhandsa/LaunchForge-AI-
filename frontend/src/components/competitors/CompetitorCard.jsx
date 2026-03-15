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
          className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xs font-extrabold flex-shrink-0 overflow-hidden"
          style={{
            background: `${c.color}18`,
            border: `1px solid ${c.color}35`,
            color: c.color,
            fontFamily: "Syne, sans-serif",
          }}
        >
          {/* Force maximum 2 chars, or fallback to the first letter of the name */}
          {String(c.logo && !c.logo.includes('.png') ? c.logo : c.name).substring(0, 2).toUpperCase()}
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

      {/* Score bar FIX */}
      <div
        className="h-[3px] rounded-full mb-4"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ 
            // Multiply by 10 if the score is out of 10
            width: `${c.score <= 10 ? c.score * 10 : c.score}%`, 
            background: `linear-gradient(90deg, ${c.color}, ${c.color}60)` 
          }}
        />
      </div>

      {/* Strengths / Weaknesses FIX */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] font-semibold text-[var(--success)] uppercase tracking-widest mb-2">
            Strengths
          </p>
          {/* Handle both Arrays and Strings from AI */}
          {(Array.isArray(c?.strengths) ? c.strengths : (typeof c?.strengths === 'string' ? c.strengths.split(',') : [])).map((s, i) => (
            <div key={i} className="flex items-start gap-1 mb-1">
              <span className="text-[var(--success)] text-sm leading-none mt-0.5">+</span>
              <span className="text-[11px] text-[var(--text)] leading-snug">{s.trim()}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[10px] font-semibold text-[#EF4444] uppercase tracking-widest mb-2">
            Weaknesses
          </p>
          {(Array.isArray(c?.weaknesses) ? c.weaknesses : (typeof c?.weaknesses === 'string' ? c.weaknesses.split(',') : [])).map((w, i) => (
            <div key={i} className="flex items-start gap-1 mb-1">
              <span className="text-[#EF4444] text-sm leading-none mt-0.5">−</span>
              <span className="text-[11px] text-[var(--text)] leading-snug">{w.trim()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
