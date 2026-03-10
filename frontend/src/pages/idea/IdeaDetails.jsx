import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Star, Download } from "lucide-react";
import IdeaPlanCard from "../../components/idea/IdeaPlanCard";
import ScoreChart from "../../components/charts/ScoreChart";
import RoadmapTimeline from "../../components/roadmap/RoadmapTimeline";
import CompetitorList from "../../components/competitors/CompetitorList";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { ideaService } from "../../services/ideaService";
import { useIdea } from "../../hooks/useIdea";

export default function IdeaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIdea } = useIdea();
  const [idea, setLocalIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No idea ID provided");
      setLoading(false);
      return;
    }

    loadIdea();
  }, [id]);

  const loadIdea = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ideaService.getIdeaById(id);
      
      // Transform the backend data to frontend format
      const plan = data.generated_plan || {};
      const transformedIdea = {
        id: data.id,
        prompt: data.idea_text,
        createdAt: data.created_at,
        plan: {
          problem: plan.problem || "Problem not defined",
          targetUsers: Array.isArray(plan.target_users) ? plan.target_users.join(", ") : plan.target_users || "Not specified",
          uniqueValue: plan.usp || "Unique value proposition not defined",
          market: plan.market_size || "Market size not estimated",
        },
        scores: [
          plan.idea_score?.market || 0,
          plan.idea_score?.profit || 0,
          plan.idea_score?.difficulty || 0,
          plan.idea_score?.success_probability || 0,
        ],
        roadmap: [
          { 
            week: "30 Days", 
            title: "MVP Phase", 
            tasks: Array.isArray(plan.roadmap_30_days) ? plan.roadmap_30_days : [], 
            status: "active" 
          },
          { 
            week: "90 Days", 
            title: "Growth Phase", 
            tasks: Array.isArray(plan.roadmap_90_days) ? plan.roadmap_90_days : [], 
            status: "upcoming" 
          },
        ],
        competitors: Array.isArray(plan.competitors) ? plan.competitors : [],
      };
      
      setLocalIdea(transformedIdea);
      // Set the current idea in global context
      setIdea(transformedIdea);
    } catch (err) {
      console.error("Failed to load idea:", err);
      setError(err?.error || err?.message || "Failed to load idea");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader type="spinner" text="Loading idea details..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">⚠️ {error}</p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--muted)] mb-4">Idea not found</p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

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
