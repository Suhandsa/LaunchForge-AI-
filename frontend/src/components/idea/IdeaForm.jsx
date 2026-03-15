import { useState } from "react";
import { Sparkles, Zap } from "lucide-react";
import { EXAMPLE_PROMPTS } from "../../utils/constants";

/**
 * IdeaForm — hero prompt input that drives the whole dashboard.
 * @param {Function} onGenerate  called with the prompt string
 * @param {boolean}  loading
 */
export default function IdeaForm({ onGenerate, loading = false }) {
  const [prompt, setPrompt] = useState("AI fitness app for students");
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    if (!prompt.trim() || loading) return;
    onGenerate(prompt.trim());
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  return (
    <div className="glass-card p-7 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(34,211,238,0.3))",
            border: "1px solid rgba(99,102,241,0.35)",
          }}
        >
          <Sparkles size={15} color="#A5B4FC" />
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-[var(--text)]">Idea Generator</h2>
          <p className="text-xs text-[var(--muted)] mt-0.5">
            Describe your startup — get a full AI execution plan
          </p>
        </div>
        <span
          className="ml-auto text-[11px] text-[var(--muted)] px-2 py-1 rounded-md"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}
        >
          Gemini 2.5 Flash Active
        </span>
      </div>

      {/* Textarea wrapper */}
      <div
        className="rounded-xl overflow-hidden transition-all duration-200"
        style={{
          border: focused
            ? "1px solid rgba(99,102,241,0.5)"
            : "1px solid var(--border)",
          background: "rgba(255,255,255,0.02)",
          boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.08)" : "none",
        }}
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKey}
          rows={4}
          placeholder="Describe your startup idea in one sentence or a short paragraph…"
          className="w-full bg-transparent border-none outline-none resize-none text-[var(--text)] placeholder:text-[var(--muted)] text-[16px] leading-relaxed p-5"
        />

        {/* Toolbar */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {/* Example prompts */}
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLE_PROMPTS.slice(1).map((ex) => (
              <button
                key={ex}
                onClick={() => setPrompt(ex)}
                className="text-[11px] text-[var(--muted)] px-2.5 py-1 rounded-full transition-all duration-150 hover:text-[#A5B4FC]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.4)")}
                onMouseLeave={(e) => (e.target.style.borderColor = "var(--border)")}
              >
                {ex}
              </button>
            ))}
          </div>

          {/* Generate button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !prompt.trim()}
            className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white border-none cursor-pointer"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin-fast" />
                Analyzing…
              </>
            ) : (
              <>
                <Zap size={14} />
                Generate Plan
              </>
            )}
          </button>
        </div>
      </div>

      <p className="text-[11px] text-[var(--muted)] mt-3 text-right">
        ⌘ + Enter to generate
      </p>
    </div>
  );
}
