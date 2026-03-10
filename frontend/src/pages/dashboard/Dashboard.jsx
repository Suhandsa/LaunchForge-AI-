import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useIdea } from "../../hooks/useIdea";
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
  const { setIdea } = useIdea();
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [plan, setPlan] = useState(null);
  const [ideaId, setIdeaId] = useState(null);
  const [ideaText, setIdeaText] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (prompt) => {
    setLoading(true);
    setError(null);
    setGenerated(false);
    setPlan(null);
    
    try {
      const result = await ideaService.generateIdea({ idea: prompt });
      console.log("✅ API Response:", result);
      
      if (!result.generated_plan) {
        throw new Error("No plan data in response");
      }
      
      setPlan(result.generated_plan);
      setIdeaId(result.idea_id);
      setIdeaText(prompt);
      setGenerated(true);

      // Set current idea in context for chat page
      setIdea({
        id: result.idea_id,
        idea_text: prompt,
        generated_plan: result.generated_plan,
      });
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
    { label: "Ideas Generated", value: "∞", change: "Keep building", color: "#6366F1" },
    { label: "AI Power", value: "✨", change: "Gemini Pro", color: "#22D3EE" },
    { label: "Pitch Decks", value: "📊", change: "Export ready", color: "#10B981" },
    { label: "AI Chat", value: "💬", change: "Co-founder", color: "#F59E0B" },
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
          <p className="text-red-400 text-[14px]">⚠️ {error}</p>
        </div>
      )}

      {/* Generated content */}
      {loading && <Loader type="block" text="Generating your startup plan using Gemini AI..." />}

      <ErrorBoundary>
        {generated && plan && (
          <div className="mt-8 space-y-5 animate-fade-up">
            {/* Header with export */}
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-extrabold text-[var(--text)]">
                📋 Your Startup Plan
              </h2>
              {ideaId && (
                <ExportButton ideaId={ideaId} loading={exporting} />
              )}
            </div>

            {/* Overview */}
            <IdeaPlanCard plan={plan} />

            {/* Problem Statement & USP + Scores */}
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
            {plan.competitors && plan.competitors.length > 0 && (
              <CompetitorList competitors={plan.competitors} />
            )}

            {/* Chat CTA */}
            <div className="glass-card p-6 border-l-4 border-blue-500 bg-blue-500/5">
              <p className="text-[var(--text)] mb-3">
                💡 <strong>Ready to dive deeper?</strong> Go to AI Chat to discuss strategy, pricing, and go-to-market plans with your AI co-founder.
              </p>
              <a
                href="/chat"
                className="inline-block px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                💬 Start Chat
              </a>
            </div>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}

