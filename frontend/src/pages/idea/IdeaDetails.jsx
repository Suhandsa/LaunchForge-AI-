import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Download } from "lucide-react";
import IdeaPlanCard from "../../components/idea/IdeaPlanCard";
import ScoreChart from "../../components/charts/ScoreChart";
import RoadmapTimeline from "../../components/roadmap/RoadmapTimeline";
import CompetitorList from "../../components/competitors/CompetitorList";
import Button from "../../components/common/Button";

// Mock — replace with useFetch(() => ideaService.getById(id), [id])
const MOCK = {
  id: "1",
  prompt: "AI fitness app for students",
  createdAt: new Date().toISOString(),
  plan: {
    problem:     "Students lack personalised fitness guidance that fits campus life.",
    targetUsers: "College students aged 18–26.",
    uniqueValue: "AI coach that syncs with your class schedule and campus gym.",
    market:      "$96B global fitness market, 20M US college students.",
  },
  scores: [88, 72, 85, 60, 80],
  roadmap: [
    { week: "Week 1–2", title: "Foundation",      tasks: ["Research", "Stack setup"],  status: "done"     },
    { week: "Week 3–4", title: "Core AI Engine",  tasks: ["GPT-4 integration"],        status: "active"   },
    { week: "Week 5–6", title: "MVP",              tasks: ["UI", "Tracker"],            status: "upcoming" },
  ],
  competitors: [
    { name: "MyFitnessPal", logo: "MF", color: "#22c55e", pricing: "$19.99/mo", strengths: ["Database", "Brand"], weaknesses: ["Generic"], score: 72 },
    { name: "Fitbod",       logo: "FB", color: "#8b5cf6", pricing: "$12.99/mo", strengths: ["AI sets"],           weaknesses: ["Gym only"], score: 68 },
  ],
};

export default function IdeaDetails() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const idea      = MOCK; // ideaService.getById(id)

  return (
    <div>
      {/* Back + actions */}
      <div className="flex items-center gap-3 mb-7">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--text)] transition-colors text-sm"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="ml-auto flex gap-2">
          <Button variant="ghost" size="sm" icon={<Star size={14} />}>
            Favourite
          </Button>
          <Button variant="primary" size="sm" icon={<Download size={14} />}>
            Export
          </Button>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-[24px] font-extrabold text-[var(--text)] mb-1 capitalize">
          {idea.prompt}
        </h1>
        <p className="text-[13px] text-[var(--muted)]">
          Generated {new Date(idea.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <div className="space-y-5">
        <IdeaPlanCard plan={idea.plan} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ScoreChart scores={idea.scores} />
          <RoadmapTimeline items={idea.roadmap} />
        </div>

        <CompetitorList competitors={idea.competitors} />
      </div>
    </div>
  );
}
