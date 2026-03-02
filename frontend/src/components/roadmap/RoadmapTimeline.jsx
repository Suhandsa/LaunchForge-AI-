import { CheckCircle, Clock } from "lucide-react";

const STATUS_CFG = {
  done:     { color: "#10B981", bg: "rgba(16,185,129,0.12)",  label: "Done"     },
  active:   { color: "#6366F1", bg: "rgba(99,102,241,0.12)",  label: "Active"   },
  upcoming: { color: "#6B7280", bg: "rgba(255,255,255,0.04)", label: "Upcoming" },
};

/**
 * RoadmapTimeline — vertical execution roadmap.
 * @param {{ week, title, tasks, status }[]} items
 */
export default function RoadmapTimeline({ items = [] }) {
  return (
    <div className="glass-card p-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <Clock size={16} color="#A5B4FC" />
        <h3 className="text-[15px] font-bold text-[var(--text)]">Execution Roadmap</h3>
        <span
          className="ml-auto text-[11px] text-[var(--muted)] px-2 py-0.5 rounded-md"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}
        >
          {items.length * 2} Weeks
        </span>
      </div>

      {/* Timeline */}
      <div className="relative pl-6">
        {/* Vertical line */}
        <div
          className="absolute left-[7px] top-2 bottom-2 w-[2px] rounded"
          style={{
            background:
              "linear-gradient(to bottom, #10B981 35%, #6366F1 65%, rgba(255,255,255,0.08) 100%)",
          }}
        />

        {items.map((item, i) => {
          const cfg = STATUS_CFG[item.status] || STATUS_CFG.upcoming;
          return (
            <div key={i} className={i < items.length - 1 ? "pb-5" : ""} style={{ position: "relative" }}>
              {/* Dot */}
              <div
                className="absolute -left-[13px] top-1 w-3.5 h-3.5 rounded-full"
                style={{
                  background: cfg.color,
                  border: "2px solid var(--bg)",
                  boxShadow: item.status === "active" ? `0 0 10px ${cfg.color}` : "none",
                  zIndex: 1,
                }}
              />

              {/* Week + title */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[11px] font-semibold" style={{ color: cfg.color }}>
                  {item.week}
                </span>
                <span className="text-[14px] font-bold text-[var(--text)]" style={{ fontFamily: "Syne, sans-serif" }}>
                  {item.title}
                </span>
                <span
                  className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{ color: cfg.color, background: cfg.bg }}
                >
                  {cfg.label}
                </span>
              </div>

              {/* Tasks */}
              <div className="flex flex-col gap-1.5">
                {item.tasks.map((task, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <CheckCircle
                      size={11}
                      color={item.status === "done" ? "#10B981" : "var(--muted)"}
                      className="flex-shrink-0"
                    />
                    <span
                      className="text-[12px]"
                      style={{ color: item.status === "upcoming" ? "var(--muted)" : "var(--text)" }}
                    >
                      {task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
