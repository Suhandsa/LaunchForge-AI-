/**
 * ExecutionRoadmap — displays 30-day and 90-day milestones
 */
export default function ExecutionRoadmap({ roadmap30 = [], roadmap90 = [] }) {
  const safeRoadmap30 = Array.isArray(roadmap30) ? roadmap30 : [];
  const safeRoadmap90 = Array.isArray(roadmap90) ? roadmap90 : [];
  return (
    <div className="glass-card p-6 hover-lift">
      <h3 className="text-[15px] font-bold text-[var(--text)] mb-5">Execution Roadmap</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 30-day roadmap */}
        <div>
          <h4 className="text-[13px] font-bold text-[#6366F1] mb-3">📅 30-Day Sprint</h4>
          <div className="space-y-2">
            {safeRoadmap30.map((milestone, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="w-2 h-2 rounded-full bg-[#6366F1]" />
                <p className="text-[13px] text-[var(--text)]">{milestone}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 90-day roadmap */}
        <div>
          <h4 className="text-[13px] font-bold text-[#22D3EE] mb-3">🚀 90-Day Growth</h4>
          <div className="space-y-2">
            {safeRoadmap90.map((milestone, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="w-2 h-2 rounded-full bg-[#22D3EE]" />
                <p className="text-[13px] text-[var(--text)]">{milestone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
