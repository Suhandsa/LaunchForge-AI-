import { Shield } from "lucide-react";
import CompetitorCard from "./CompetitorCard";

/**
 * CompetitorList — renders a grid of CompetitorCards.
 * @param {{ name, logo, color, pricing, strengths, weaknesses, score }[]} competitors
 */
export default function CompetitorList({ competitors = [] }) {
  const safeCompetitors = Array.isArray(competitors) ? competitors : [];
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-4">
        <Shield size={16} color="#A5B4FC" />
        <h3 className="text-[15px] font-bold text-[var(--text)]">Competitor Landscape</h3>
        <span className="text-[12px] text-[var(--muted)] ml-1">
          {safeCompetitors.length} companies identified
        </span>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {safeCompetitors.map((c) => (
          <CompetitorCard key={c.name} competitor={c} />
        ))}
      </div>
    </section>
  );
}
