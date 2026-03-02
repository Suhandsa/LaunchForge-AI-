import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import IdeaForm from "../../components/idea/IdeaForm";
import IdeaPlanCard from "../../components/idea/IdeaPlanCard";
import ScoreChart from "../../components/charts/ScoreChart";
import RoadmapTimeline from "../../components/roadmap/RoadmapTimeline";
import CompetitorList from "../../components/competitors/CompetitorList";

// ── Mock data (replace with ideaService.generate()) ───────
const MOCK_PLAN = {
  problem:     "Students lack personalized, affordable fitness guidance that adapts to academic schedules and dorm/campus environments.",
  targetUsers: "College students aged 18–26 with irregular schedules, limited budgets, and no gym experience.",
  uniqueValue: "AI coach that learns your class schedule, dining hall menus, and campus gym hours to build hyper-personalised 15-min workouts.",
  market:      "$96B global fitness app market. 20M US college students — less than 8% use dedicated fitness apps consistently.",
};

const MOCK_ROADMAP = [
  { week: "Week 1–2", title: "Foundation",     tasks: ["User research & validation", "Tech stack setup", "Auth & onboarding flow"],       status: "done"     },
  { week: "Week 3–4", title: "Core AI Engine", tasks: ["GPT-4 integration", "Schedule parsing algorithm", "Workout generation API"],       status: "done"     },
  { week: "Week 5–6", title: "MVP Build",      tasks: ["Mobile-first UI", "Workout tracker", "Push notifications"],                        status: "active"   },
  { week: "Week 7–8", title: "Launch",          tasks: ["Beta with 50 students", "Iterate on feedback", "App store submission"],           status: "upcoming" },
];

const MOCK_COMPETITORS = [
  { name: "MyFitnessPal", logo: "MF", color: "#22c55e", pricing: "$19.99/mo", strengths: ["Huge food database", "Brand recognition", "Social features"], weaknesses: ["Generic plans", "Not student-focused", "Complex UI"], score: 72 },
  { name: "Nike Training", logo: "NT", color: "#f97316", pricing: "Free",      strengths: ["High quality videos", "Brand trust", "No paywall"],            weaknesses: ["No personalisation", "No schedule sync", "No campus data"], score: 65 },
  { name: "Fitbod",        logo: "FB", color: "#8b5cf6", pricing: "$12.99/mo", strengths: ["Smart AI sets", "Clean design", "Equipment-aware"],             weaknesses: ["Gym-only focus", "Expensive for students", "No meal planning"], score: 68 },
  { name: "StrideFit AI",  logo: "SF", color: "#6366F1", pricing: "$4.99/mo",  strengths: ["Student pricing", "Campus-aware", "AI-native"],                  weaknesses: ["Early stage", "Small user base", "Limited content"], score: 91 },
];

const STATS = [
  { label: "Ideas Generated",    value: "12",   change: "+3 this week", color: "#6366F1" },
  { label: "Avg Viability Score",value: "78",   change: "+5 pts",       color: "#22D3EE" },
  { label: "Pitch Decks",        value: "4",    change: "2 exported",   color: "#10B981" },
  { label: "AI Tokens Used",     value: "148K", change: "52K remaining",color: "#F59E0B" },
];
// ──────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user } = useAuth();
  const [loading,   setLoading]   = useState(false);
  const [generated, setGenerated] = useState(true);   // true = show mock data

  const handleGenerate = async (prompt) => {
    setLoading(true);
    setGenerated(false);
    // Replace with: const result = await ideaService.generate({ prompt });
    await new Promise((r) => setTimeout(r, 2200));
    setLoading(false);
    setGenerated(true);
  };

  const firstName = user?.name?.split(" ")[0] || "Jordan";

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

      {/* Generated content */}
      {generated && (
        <div className="mt-5 space-y-5 animate-fade-up">
          <IdeaPlanCard plan={MOCK_PLAN} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ScoreChart scores={[88, 72, 85, 60, 80]} />
            <RoadmapTimeline items={MOCK_ROADMAP} />
          </div>

          <CompetitorList competitors={MOCK_COMPETITORS} />
        </div>
      )}
    </div>
  );
}
