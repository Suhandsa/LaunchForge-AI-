/**
 * BusinessPlanCard — displays monetization strategy, pricing, and acquisition
 */
export default function BusinessPlanCard({ businessPlan = {} }) {
  const safePlan = businessPlan || {};
  const monetization = safePlan.monetization || "";
  const pricing = safePlan.pricing || "";
  const acquisition = safePlan.acquisition || "";

  const items = [
    { label: "Monetization", value: monetization, icon: "💰" },
    { label: "Pricing Model", value: pricing, icon: "💵" },
    { label: "Customer Acquisition", value: acquisition, icon: "📈" }
  ];

  return (
    <div className="glass-card p-6 hover-lift">
      <h3 className="text-[15px] font-bold text-[var(--text)] mb-4">Business Plan</h3>
      <div className="space-y-4">
        {Array.isArray(items) && items.map(({ label, value, icon }) => (
          <div key={label} className="border-l-4 border-[#6366F1] pl-4">
            <p className="text-[12px] text-[var(--muted)] mb-1">{icon} {label}</p>
            <p className="text-[14px] text-[var(--text)] font-semibold">{value || "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
