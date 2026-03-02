import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ideaService } from "../../services/ideaService";
import IdeaForm from "../../components/idea/IdeaForm";
import IdeaPlanCard from "../../components/idea/IdeaPlanCard";
import ScoreChart from "../../components/charts/ScoreChart";
import RoadmapTimeline from "../../components/roadmap/RoadmapTimeline";
import CompetitorList from "../../components/competitors/CompetitorList";
import Loader from "../../components/common/Loader";

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (prompt) => {
    setLoading(true);
    setError(null);
    try {
      const result = await ideaService.generate({ idea: prompt });
      setPlan(result.generated_plan);
      setGenerated(true);
    } catch (err) {
      setError(err?.error || "Failed to generate plan");
      setGenerated(false);
    } finally {
      setLoading(false);
    }
  };

  const firstName = user?.name?.split(" ")[0] || "Founder";

  const STATS = [
    { label: "Ideas Generated", value: "—", change: "Check your ideas", color: "#6366F1" },
    { label: "Avg Viability Score", value: "—", change: "Analyze ideas", color: "#22D3EE" },
    { label: "Pitch Decks", value: "—", change: "Ready to export", color: "#10B981" },
    { label: "AI Chats", value: "—", change: "Use AI co-founder", color: "#F59E0B" },
  ];

  return (
    <div>
      {/* Greeting */}
      <div className="mb-7">
        <h1 className="text-[28px] font-extrabold text-[var(--text)] mb-1.5">
          Good morning, {firstName} 👋
        </h1>
        <p className="text-[15px] text-[var(--muted)]">
          Your AI co-founder is ready. Let's build something great today.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {STATS.map(({ label, value, change, color }) => (
          <div key={label} className="glass-card hover-lift p-5">
            <p className="text-[12px] text-[var(--muted)] mb-2">{label}</p>
            <p className="text-[26px] font-extrabold leading-none mb-1.5"
               style={{ color, fontFamily: "Syne, sans-serif" }}>
              {value}
            </p>
            <p className="text-[11px] text-[var(--muted)]">{change}</p>
          </div>
        ))}
      </div>

      {/* Idea input */}
      <IdeaForm onGenerate={handleGenerate} loading={loading} />

      {/* Error message */}
      {error && (
        <div className="mt-5 glass-card p-4 border-l-4 border-red-500">
          <p className="text-red-400 text-[14px]">{error}</p>
        </div>
      )}

      {/* Generated content */}
      {loading && <Loader type="block" text="Generating your startup plan..." />}

      {generated && plan && (
        <div className="mt-5 space-y-5 animate-fade-up">
          <IdeaPlanCard plan={plan} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {plan.idea_score && (
              <ScoreChart scores={[
                plan.idea_score.market || 0,
                plan.idea_score.profit || 0,
                plan.idea_score.difficulty || 0,
                plan.idea_score.success_probability || 0
              ]} />
            )}
            {plan.roadmap_30_days && (
              <RoadmapTimeline items={[
                { week: "Week 1-2", title: "MVP Foundation", tasks: plan.roadmap_30_days.slice(0, 2), status: "active" },
                { week: "Week 3-4", title: "Build & Launch", tasks: plan.roadmap_30_days.slice(2), status: "upcoming" }
              ]} />
            )}
          </div>

          {plan.competitors && (
            <CompetitorList competitors={plan.competitors.slice(0, 4)} />
          )}
        </div>
      )}
    </div>
  );
}
