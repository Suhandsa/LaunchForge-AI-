/**
 * MVPFeaturesCard — displays MVP feature list
 */
export default function MVPFeaturesCard({ mvpFeatures = [] }) {
  const safeFeatures = Array.isArray(mvpFeatures) ? mvpFeatures : [];
  return (
    <div className="glass-card p-6 hover-lift">
      <h3 className="text-[15px] font-bold text-[var(--text)] mb-4">MVP Features</h3>
      <div className="space-y-3">
        {safeFeatures.map((feature, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="w-5 h-5 rounded-lg bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-[11px] font-bold">✓</span>
            </div>
            <p className="text-[13px] text-[var(--text)]">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
