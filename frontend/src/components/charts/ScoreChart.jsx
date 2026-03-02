import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Activity } from "lucide-react";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const METRICS = ["Market Demand", "Competition", "Profit Potential", "Difficulty", "Success Prob."];

/**
 * ScoreChart — Radar chart of idea viability metrics.
 * @param {number[]} scores  — array of 5 values (0–100)
 */
export default function ScoreChart({ scores = [88, 72, 85, 60, 80] }) {
  const overall = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  const chartData = {
    labels: METRICS,
    datasets: [
      {
        data: scores,
        backgroundColor: "rgba(99,102,241,0.15)",
        borderColor: "rgba(99,102,241,0.85)",
        borderWidth: 2,
        pointBackgroundColor: "#6366F1",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointBorderWidth: 2,
        pointRadius: 4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17,24,39,0.95)",
        borderColor: "rgba(99,102,241,0.3)",
        borderWidth: 1,
        titleColor: "#E5E7EB",
        bodyColor: "#9CA3AF",
        padding: 10,
        callbacks: {
          label: (ctx) => ` ${ctx.raw}/100`,
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        backgroundColor: "transparent",
        grid:        { color: "rgba(255,255,255,0.05)" },
        angleLines:  { color: "rgba(255,255,255,0.06)" },
        pointLabels: { color: "#9CA3AF", font: { size: 11, family: "DM Sans" } },
        ticks:       { display: false, stepSize: 25 },
      },
    },
  };

  const highlights = [
    { label: "Market",  val: scores[0], c: "#6366F1" },
    { label: "Profit",  val: scores[2], c: "#22D3EE" },
    { label: "Success", val: scores[4], c: "#10B981" },
  ];

  return (
    <div className="glass-card p-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-1">
        <Activity size={16} color="#A5B4FC" />
        <h3 className="text-[15px] font-bold text-[var(--text)]">Viability Score</h3>
        <span
          className="ml-auto text-2xl font-extrabold gradient-text"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {overall}
        </span>
      </div>
      <p className="text-xs text-[var(--muted)] mb-4">5-metric AI assessment</p>

      {/* Chart */}
      <div className="max-w-[230px] mx-auto">
        <Radar data={chartData} options={options} />
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {highlights.map(({ label, val, c }) => (
          <div
            key={label}
            className="text-center p-2.5 rounded-xl"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--border)" }}
          >
            <p className="text-lg font-bold" style={{ color: c, fontFamily: "Syne, sans-serif" }}>
              {val}
            </p>
            <p className="text-[10px] text-[var(--muted)] mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
