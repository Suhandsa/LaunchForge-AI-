import { useState, useEffect } from "react";
import {
  AlertTriangle, Zap, Globe, DollarSign,
  Shield, Rocket, ChevronLeft, ChevronRight,
  Download, Play, Loader, X
} from "lucide-react";
import Button from "../../components/common/Button";
import { ideaService } from "../../services/ideaService";
import { pitchService } from "../../services/pitchService";

const getSlideColor = (index) => {
  const colors = ["#EF4444", "#6366F1", "#22D3EE", "#10B981", "#F59E0B", "#8B5CF6"];
  return colors[index % colors.length];
};

const getSlideIcon = (index) => {
  const icons = [AlertTriangle, Zap, Globe, DollarSign, Shield, Rocket];
  return icons[index % icons.length];
};

export default function PitchDeck() {
  const [current, setCurrent] = useState(0);
  const [ideas, setIdeas] = useState([]);
  const [selectedIdeaId, setSelectedIdeaId] = useState(null);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [presentMode, setPresentMode] = useState(false);

  // Load user's ideas on mount
  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const userIdeas = await ideaService.getAllIdeas();
        setIdeas(userIdeas || []);
        if (userIdeas && userIdeas.length > 0) {
          setSelectedIdeaId(userIdeas[0].id);
        }
      } catch (err) {
        console.error("Failed to load ideas:", err);
      } finally {
        setLoading(false);
      }
    };
    loadIdeas();
  }, []);

  // Handle keyboard navigation in Present Mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!presentMode) return;
      if (e.key === "Escape") setPresentMode(false);
      if (e.key === "ArrowRight") setCurrent(c => Math.min(slides.length - 1, c + 1));
      if (e.key === "ArrowLeft") setCurrent(c => Math.max(0, c - 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [presentMode, slides.length]);

  // Generate slides when idea changes
  useEffect(() => {
    if (!selectedIdeaId) return;
    
    const generateSlides = async () => {
      try {
        const idea = await ideaService.getIdeaById(selectedIdeaId);
        const plan = idea.generated_plan || {};

        const generatedSlides = [
          {
            label: "Problem",
            headline: "The Problem",
            body: plan.problem || "Problem not yet analyzed.",
            stat: plan.idea_score?.market || "—",
            statLabel: "Market Score",
          },
          {
            label: "Solution",
            headline: "Our Solution",
            body: `Unique Value:\n${plan.usp || "Being determined"}\n\nKey MVP Features:\n• ${(plan.mvp_features || []).slice(0, 4).join("\n• ")}`,
            stat: (plan.mvp_features || []).length || "—",
            statLabel: "MVP Features",
          },
          {
            label: "Market",
            headline: "Target Market",
            body: `Market Size:\n${plan.market_size || "To be determined"}\n\nTarget Users:\n• ${(plan.target_users || []).join("\n• ")}`,
            stat: plan.target_users ? plan.target_users.length : "—",
            statLabel: "User Segments",
          },
          {
            label: "Revenue",
            headline: "Business Model",
            body: `Monetization:\n${plan.business_plan?.monetization || "Not yet defined"}\n\nPricing Strategy:\n${plan.business_plan?.pricing || "To be determined"}\n\nAcquisition:\n${plan.business_plan?.acquisition || "To be determined"}`,
            stat: "ROI", 
            statLabel: "Growth Potential",
          },
          {
            label: "Competition",
            headline: "Competitive Edge",
            body: `Key Competitors:\n• ${(plan.competitors || []).map(c => c.name || c).join("\n• ") || "Being analyzed"}\n\nOur Advantage:\n${plan.usp || "Being determined"}`,
            stat: (plan.competitors || []).length || "—",
            statLabel: "Competitors",
          },
          {
            label: "Roadmap",
            headline: "Execution Plan",
            body: `30-Day Sprint:\n• ${(plan.roadmap_30_days || []).slice(0, 3).join("\n• ")}\n\n90-Day Vision:\n• ${(plan.roadmap_90_days || []).slice(0, 3).join("\n• ")}`,
            stat: "90",
            statLabel: "Days to MVP",
          },
        ];

        setSlides(generatedSlides);
        setCurrent(0);
      } catch (err) {
        console.error("Failed to generate slides:", err);
      }
    };

    generateSlides();
  }, [selectedIdeaId]);

  const handleExport = async () => {
    if (!selectedIdeaId) return;
    setExporting(true);
    try {
      await pitchService.exportPitch(selectedIdeaId);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export pitch deck");
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size={32} className="animate-spin" />
      </div>
    );
  }

  if (ideas.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-[24px] font-extrabold text-[var(--text)] mb-2">No Ideas Yet</h2>
        <p className="text-[var(--muted)] mb-6">Generate an idea on the Dashboard to create a pitch deck</p>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size={32} className="animate-spin" />
      </div>
    );
  }

  const slide = slides[current];
  const Icon = getSlideIcon(current);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-extrabold text-[var(--text)] mb-1">Pitch Deck</h1>
          <p className="text-[14px] text-[var(--muted)]">
            AI-generated investor presentation · {slides.length} slides
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button 
            variant="ghost" 
            icon={<Play size={14} />}
            onClick={() => setPresentMode(true)}
          >
            Present
          </Button>
          <Button 
            variant="primary" 
            icon={<Download size={14} />}
            onClick={handleExport}
            disabled={exporting}
          >
            {exporting ? "Exporting..." : "Export PPTX"}
          </Button>
        </div>
      </div>

      {/* Idea selector */}
      {ideas.length > 1 && (
        <div className="mb-6 flex gap-2 flex-wrap">
          {ideas.map((idea) => (
            <button
              key={idea.id}
              onClick={() => setSelectedIdeaId(idea.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background:
                  selectedIdeaId === idea.id
                    ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
                    : "rgba(255,255,255,0.06)",
                border:
                  selectedIdeaId === idea.id
                    ? "1px solid #6366F1"
                    : "1px solid var(--border)",
                color: "var(--text)",
              }}
            >
              {idea.idea_text?.substring(0, 30)}...
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-[200px_1fr] gap-5">
        {/* Slide list */}
        <div className="flex flex-col gap-1.5">
          {slides.map((s, i) => {
            const SI = getSlideIcon(i);
            const color = getSlideColor(i);
            return (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left transition-all duration-150"
                style={{
                  background: current === i ? `${color}14` : "rgba(255,255,255,0.025)",
                  border: `1px solid ${current === i ? `${color}40` : "var(--border)"}`,
                  color: current === i ? color : "var(--muted)",
                }}
              >
                <SI size={14} className="flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold">{s.label}</p>
                  <p className="text-[10px] opacity-60">Slide {i + 1}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Slide viewer */}
        <div className="glass-card overflow-hidden flex flex-col min-h-[480px]">
          {/* Slide header */}
          <div
            className="flex items-center gap-3 px-8 py-5 flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${getSlideColor(current)}12, transparent)`,
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${getSlideColor(current)}18`, border: `1px solid ${getSlideColor(current)}35` }}
            >
              <Icon size={20} color={getSlideColor(current)} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-0.5"
                 style={{ color: getSlideColor(current) }}>
                {slide.label} · Slide {current + 1}/{slides.length}
              </p>
              <h2 className="text-[20px] font-extrabold text-[var(--text)]">{slide.headline}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex items-center gap-10 px-8 py-8">
            <p className="flex-1 text-[14px] text-[var(--text)] leading-[1.8] whitespace-pre-wrap">{slide.body}</p>

            <div
              className="flex-shrink-0 w-44 rounded-2xl text-center px-6 py-8"
              style={{
                background: `${getSlideColor(current)}0e`,
                border: `1px solid ${getSlideColor(current)}28`,
              }}
            >
              <p className="text-[36px] font-black leading-none mb-2" style={{ color: getSlideColor(current), fontFamily: "Syne, sans-serif" }}>
                {slide.stat}
              </p>
              <p className="text-[12px] text-[var(--muted)] leading-snug">{slide.statLabel}</p>
            </div>
          </div>

          {/* Navigation */}
          <div
            className="flex items-center justify-between px-8 py-4 flex-shrink-0"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full border-none cursor-pointer transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "8px",
                    background: i === current ? getSlideColor(current) : "rgba(255,255,255,0.15)",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              {[
                { icon: ChevronLeft,  action: () => setCurrent((c) => Math.max(0, c - 1)),                    disabled: current === 0 },
                { icon: ChevronRight, action: () => setCurrent((c) => Math.min(slides.length - 1, c + 1)), disabled: current === slides.length - 1 },
              ].map(({ icon: Ico, action, disabled }, idx) => (
                <button
                  key={idx}
                  onClick={action}
                  disabled={disabled}
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    opacity: disabled ? 0.3 : 1,
                    cursor: disabled ? "default" : "pointer",
                  }}
                  onMouseEnter={(e) => !disabled && (e.currentTarget.style.background = "rgba(99,102,241,0.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                >
                  <Ico size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ── PRESENT MODE OVERLAY ── */}
      {presentMode && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center animate-fade-in"
          style={{ background: "#05070a" }}
        >
          {/* Close Button */}
          <button
            onClick={() => setPresentMode(false)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer z-50"
          >
            <X size={24} />
          </button>

          {/* Big Cinematic Slide */}
          <div className="w-full max-w-[1100px] aspect-[16/9] rounded-2xl overflow-hidden flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.8)] relative"
               style={{ background: `linear-gradient(145deg, #0f131f, #07090F)`, border: '1px solid rgba(255,255,255,0.05)' }}>
            
            {/* Decorative Glow Orb */}
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
                 style={{ background: getSlideColor(current) }} />

            {/* Slide header */}
            <div className="flex items-center gap-6 px-14 py-12 flex-shrink-0 z-10">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                   style={{ background: `linear-gradient(135deg, ${getSlideColor(current)}20, ${getSlideColor(current)}05)`, border: `1px solid ${getSlideColor(current)}30` }}>
                <Icon size={32} color={getSlideColor(current)} />
              </div>
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.25em] mb-2"
                   style={{ color: getSlideColor(current) }}>
                  {slide.label} <span className="opacity-40 mx-2">|</span> Slide {current + 1}/{slides.length}
                </p>
                <h2 className="text-[42px] font-extrabold text-white leading-none tracking-tight">{slide.headline}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex gap-16 px-14 pb-14 z-10">
              {/* Body Text */}
              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                <p className="text-[20px] text-[#D1D5DB] leading-[1.8] whitespace-pre-wrap font-light">
                  {slide.body}
                </p>
              </div>

              {/* Stat Box */}
              <div className="flex-shrink-0 w-80 flex flex-col justify-center rounded-3xl p-10 relative overflow-hidden"
                   style={{
                     background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`,
                     border: `1px solid rgba(255,255,255,0.05)`,
                     boxShadow: `inset 0 0 0 1px ${getSlideColor(current)}15`
                   }}>
                {/* Subtle icon bg */}
                <Icon size={140} className="absolute -right-8 -bottom-8 opacity-[0.03]" color="white" />
                
                <p className="text-[64px] font-black leading-none mb-3 truncate" 
                   style={{ color: getSlideColor(current), fontFamily: "Syne, sans-serif" }}>
                  {slide.stat}
                </p>
                <p className="text-[15px] text-[var(--muted)] font-semibold uppercase tracking-widest">{slide.statLabel}</p>
              </div>
            </div>
          </div>
          
          {/* Keyboard Hint */}
          <p className="absolute bottom-8 text-[var(--muted)] text-[13px] tracking-wide opacity-80">
             Use <kbd className="bg-white/10 px-2 py-0.5 rounded mx-1">←</kbd> and <kbd className="bg-white/10 px-2 py-0.5 rounded mx-1">→</kbd> to navigate · Press <kbd className="bg-white/10 px-2 py-0.5 rounded mx-1">ESC</kbd> to exit
          </p>
        </div>
      )}
    </div>
  );
}
