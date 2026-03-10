/**
 * TechStackCard — displays recommended tech stack and architecture
 */
export default function TechStackCard({ techStack = [] }) {
  const safeTechStack = Array.isArray(techStack) ? techStack : [];
  return (
    <div className="glass-card p-6 hover-lift">
      <h3 className="text-[15px] font-bold text-[var(--text)] mb-4">Recommended Tech Stack</h3>
      <div className="flex flex-wrap gap-3">
        {safeTechStack.map((tech, i) => (
          <div 
            key={i}
            className="px-4 py-2 rounded-full border border-[#6366F1] bg-[rgba(99,102,241,0.1)]"
          >
            <p className="text-[13px] font-semibold text-[#6366F1]">{tech}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
