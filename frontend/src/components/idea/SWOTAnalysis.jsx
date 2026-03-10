/**
 * SWOTAnalysis — renders Strengths, Weaknesses, Opportunities, Threats
 */
export default function SWOTAnalysis({ swot = {} }) {
  const safeSwot = swot || {};
  const strengths = Array.isArray(safeSwot.strengths) ? safeSwot.strengths : [];
  const weaknesses = Array.isArray(safeSwot.weaknesses) ? safeSwot.weaknesses : [];
  const opportunities = Array.isArray(safeSwot.opportunities) ? safeSwot.opportunities : [];
  const threats = Array.isArray(safeSwot.threats) ? safeSwot.threats : [];

  const sections = [
    { label: "Strengths", items: strengths, color: "#10B981" },
    { label: "Weaknesses", items: weaknesses, color: "#F59E0B" },
    { label: "Opportunities", items: opportunities, color: "#6366F1" },
    { label: "Threats", items: threats, color: "#EF4444" }
  ];

  return (
    <div className="glass-card p-6 hover-lift">
      <h3 className="text-[15px] font-bold text-[var(--text)] mb-4">SWOT Analysis</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map(({ label, items, color }) => (
          <div key={label} className="border border-[var(--border)] rounded-lg p-4">
            <h4 className="text-[12px] font-bold mb-3" style={{ color }}>{label}</h4>
            <ul className="space-y-2">
              {Array.isArray(items) && items.map((item, i) => (
                <li key={i} className="text-[13px] text-[var(--text)] list-disc list-inside">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
