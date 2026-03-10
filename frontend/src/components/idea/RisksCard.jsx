/**
 * RisksCard — displays risks identified for the idea
 */
export default function RisksCard({ risks = [], usp = "" }) {
  const safeRisks = Array.isArray(risks) ? risks : [];
  return (
    <div className="glass-card p-6 hover-lift">
      <h3 className="text-[15px] font-bold text-[var(--text)] mb-4">Key Risks & USP</h3>
      
      <div className="mb-5">
        <p className="text-[12px] text-[var(--muted)] mb-2">🌟 Unique Selling Point</p>
        <p className="text-[14px] text-[var(--accent)] font-semibold">{usp || "—"}</p>
      </div>

      <div>
        <p className="text-[12px] text-[var(--muted)] mb-3">⚠️ Identified Risks</p>
        <ul className="space-y-2">
          {safeRisks.map((risk, i) => (
            <li key={i} className="text-[13px] text-[var(--text)] list-disc list-inside opacity-85">
              {risk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
