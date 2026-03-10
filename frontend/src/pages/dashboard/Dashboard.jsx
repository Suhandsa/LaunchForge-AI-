import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ideaService } from "../../services/ideaService";
import { ErrorBoundary } from "../../components/common/ErrorBoundary";
import IdeaForm from "../../components/idea/IdeaForm";
import IdeaPlanCard from "../../components/idea/IdeaPlanCard";
import SWOTAnalysis from "../../components/idea/SWOTAnalysis";
import BusinessPlanCard from "../../components/idea/BusinessPlanCard";
import RisksCard from "../../components/idea/RisksCard";
import ExecutionRoadmap from "../../components/idea/ExecutionRoadmap";
import MVPFeaturesCard from "../../components/idea/MVPFeaturesCard";
import TechStackCard from "../../components/idea/TechStackCard";
import ExportButton from "../../components/idea/ExportButton";
import ScoreChart from "../../components/charts/ScoreChart";
import RoadmapTimeline from "../../components/roadmap/RoadmapTimeline";
import CompetitorList from "../../components/competitors/CompetitorList";
import Loader from "../../components/common/Loader";

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [plan, setPlan] = useState(null);
  const [ideaId, setIdeaId] = useState(null);
  const [error, setError] = useState(null);
  const [renderError, setRenderError] = useState(null);

  const handleGenerate = async (prompt) => {
    setLoading(true);
    setError(null);
    setRenderError(null);
    setGenerated(false);
    setPlan(null);
    
    try {
      const result = await ideaService.generateIdea({ idea: prompt });
      console.log("✅ API Response:", result);
      console.log("✅ Generated Plan key names:", Object.keys(result.generated_plan || {}));
      
      if (!result.generated_plan) {
        throw new Error("No plan data in response");
      }
      
      setPlan(result.generated_plan);
      setIdeaId(result.idea_id);
      setGenerated(true);
    } catch (err) {
      console.error("❌ Generation Error:", err);
      const errorMsg = err?.error || err?.message || "Failed to generate plan";
      setError(errorMsg);
      setGenerated(false);
      setPlan(null);
    } finally {
      setLoading(false);
    }
  };

  const firstName = user?.name?.split(" ")[0] || "Founder";

  const STATS = [
    { label: "Ideas Generated", value: "—", change: "Check your ideas", color: "#6366F1" },
                { label: "Avg Score", value: "—", change: "Based on ideas", color: "#22D3EE" },
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

      {renderError && (
        <div className="mt-5 glass-card p-4 border-l-4 border-orange-500">
          <p className="text-orange-400 text-[14px]">{renderError}</p>
        </div>
      )}

      <ErrorBoundary>
        {generated && plan && (
          <div className="mt-5 space-y-5 animate-fade-up">
            {/* Overview */}
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <IdeaPlanCard plan={plan} />
              </div>
            {ideaId && (
              <ExportButton ideaId={ideaId} loading={exporting} />
            )}
          </div>

          {/* Problem Statement & USP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {plan.usp && (
              <RisksCard risks={plan.risks || []} usp={plan.usp} />
            )}
            {plan.idea_score && (
              <ScoreChart scores={[
                plan.idea_score.market || 0,
                plan.idea_score.profit || 0,
                plan.idea_score.difficulty || 0,
                plan.idea_score.success_probability || 0
              ]} />
            )}
          </div>

          {/* Business & MVP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {plan.business_plan && (
              <BusinessPlanCard businessPlan={plan.business_plan} />
            )}
            {plan.mvp_features && (
              <MVPFeaturesCard mvpFeatures={plan.mvp_features} />
            )}
          </div>

          {/* SWOT & Tech Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {plan.swot && (
              <SWOTAnalysis swot={plan.swot} />
            )}
            {plan.tech_stack && (
              <TechStackCard techStack={plan.tech_stack} />
            )}
          </div>

          {/* Execution Roadmap */}
          {(plan.roadmap_30_days || plan.roadmap_90_days) && (
            <ExecutionRoadmap 
              roadmap30={plan.roadmap_30_days || []}
              roadmap90={plan.roadmap_90_days || []}
            />
          )}

          {/* Competitors */}
          {plan.competitors && (
            <CompetitorList competitors={plan.competitors.slice(0, 4)} />
          )}
        </div>
        )}
      </ErrorBoundary>
    </div>
  );
}
