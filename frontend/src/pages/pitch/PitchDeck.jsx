import { useState } from "react";
import {
  AlertTriangle, Zap, Globe, DollarSign,
  Shield, Rocket, ChevronLeft, ChevronRight,
  Download, Play,
} from "lucide-react";
import Button from "../../components/common/Button";

const SLIDES = [
  { id: 1, label: "Problem",     icon: AlertTriangle, color: "#EF4444", headline: "Students Fail at Fitness",        body: "83% of college students want to exercise regularly. Only 17% succeed. The gap isn't motivation — it's friction. Generic apps don't understand 8am classes, dining hall meals, or 200sqft dorm rooms.", stat: "83%",   statLabel: "want to exercise but don't" },
  { id: 2, label: "Solution",    icon: Zap,           color: "#6366F1", headline: "Your AI Campus Coach",            body: "StrideFit learns your class schedule, maps your campus gym, scans your dining hall menu, and delivers hyper-personalised 15-minute workouts that actually fit your life.",                              stat: "15min",  statLabel: "average workout time" },
  { id: 3, label: "Market",      icon: Globe,         color: "#22D3EE", headline: "$2.4B Addressable Market",        body: "20M US college students. $96B global fitness market growing at 14% CAGR. Student wellness spending up 340% post-pandemic. University wellness budgets: $12B annually.",                              stat: "$96B",   statLabel: "global fitness market" },
  { id: 4, label: "Revenue",     icon: DollarSign,    color: "#10B981", headline: "Three Revenue Streams",           body: "Consumer subscriptions at $4.99/month. Campus licensing at $3/student/year. Premium features and partner integrations with campus dining and gyms.",                                             stat: "$2.1M",  statLabel: "projected ARR Year 2" },
  { id: 5, label: "Competition", icon: Shield,        color: "#F59E0B", headline: "We Win Where Others Can't",      body: "No competitor has campus-native AI. MyFitnessPal is generic. Nike Training is entertainment. Fitbod is gym-only. We are the only player with real student context.",                              stat: "0",      statLabel: "direct campus-AI competitors" },
  { id: 6, label: "Ask",         icon: Rocket,        color: "#8B5CF6", headline: "Raising $1.2M Seed",             body: "18 months runway. Hire 3 engineers + 1 campus partnerships lead. Launch at 10 universities. Target 50K MAU and $180K ARR by month 12.",                                                         stat: "$1.2M",  statLabel: "seed round" },
];

export default function PitchDeck() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];
  const Icon  = slide.icon;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-extrabold text-[var(--text)] mb-1">Pitch Deck</h1>
          <p className="text-[14px] text-[var(--muted)]">
            AI-generated investor presentation · {SLIDES.length} slides
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="ghost" icon={<Play size={14} />}>Present</Button>
          <Button variant="primary" icon={<Download size={14} />}>Export PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-[200px_1fr] gap-5">
        {/* Slide list */}
        <div className="flex flex-col gap-1.5">
          {SLIDES.map((s, i) => {
            const SI = s.icon;
            return (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left transition-all duration-150"
                style={{
                  background: current === i ? `${s.color}14` : "rgba(255,255,255,0.025)",
                  border: `1px solid ${current === i ? `${s.color}40` : "var(--border)"}`,
                  color: current === i ? s.color : "var(--muted)",
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
              background: `linear-gradient(135deg, ${slide.color}12, transparent)`,
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${slide.color}18`, border: `1px solid ${slide.color}35` }}
            >
              <Icon size={20} color={slide.color} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-0.5"
                 style={{ color: slide.color }}>
                {slide.label} · Slide {current + 1}/{SLIDES.length}
              </p>
              <h2 className="text-[20px] font-extrabold text-[var(--text)]">{slide.headline}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex items-center gap-10 px-8 py-8">
            <p className="flex-1 text-[16px] text-[var(--text)] leading-[1.8]">{slide.body}</p>

            <div
              className="flex-shrink-0 w-44 rounded-2xl text-center px-6 py-8"
              style={{
                background: `${slide.color}0e`,
                border: `1px solid ${slide.color}28`,
              }}
            >
              <p className="text-[36px] font-black leading-none mb-2" style={{ color: slide.color, fontFamily: "Syne, sans-serif" }}>
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
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full border-none cursor-pointer transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "8px",
                    background: i === current ? slide.color : "rgba(255,255,255,0.15)",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              {[
                { icon: ChevronLeft,  action: () => setCurrent((c) => Math.max(0, c - 1)),                    disabled: current === 0 },
                { icon: ChevronRight, action: () => setCurrent((c) => Math.min(SLIDES.length - 1, c + 1)), disabled: current === SLIDES.length - 1 },
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
    </div>
  );
}
