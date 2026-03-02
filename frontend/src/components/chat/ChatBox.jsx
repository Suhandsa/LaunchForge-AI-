import { useState, useRef, useEffect } from "react";
import { Send, Bot } from "lucide-react";
import MessageBubble from "./MessageBubble";
import Loader from "../common/Loader";

const INITIAL_MESSAGES = [
  {
    role: "ai",
    text: "Welcome! I've analysed your idea **AI Fitness App for Students**. What aspect would you like to explore — market sizing, technical architecture, pricing, or go-to-market strategy?",
  },
];

/**
 * ChatBox — full ChatGPT-style interface.
 * In production, replace the mock reply with chatService.sendMessage().
 * @param {string} ideaContext — name / description of the current idea
 */
export default function ChatBox({ ideaContext = "AI Fitness App for Students" }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const endRef = useRef(null);

  const scrollToBottom = () =>
    endRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom, [messages, typing]);

  const send = async () => {
    const text = input.trim();
    if (!text || typing) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);

    // ── Replace this block with real API call ──
    await new Promise((r) => setTimeout(r, 1600));
    setTyping(false);
    setMessages((m) => [
      ...m,
      {
        role: "ai",
        text:
          "Great question! For the student market, I'd prioritise **retention over acquisition** in the first 90 days.\n\nStudents engage most at semester start (January, September) but drop off after week 4. Building **streak mechanics** and social accountability features early will dramatically improve your LTV and reduce churn.",
      },
    ]);
    // ──────────────────────────────────────────
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="glass-card flex flex-col overflow-hidden" style={{ height: "calc(100vh - 60px - 120px)" }}>
      {/* Context bar */}
      <div
        className="flex items-center gap-2.5 px-5 py-3.5 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span className="dot-pulse" />
        <span className="text-[13px] text-[var(--text)]">
          Context:{" "}
          <strong className="text-[#A5B4FC]">{ideaContext}</strong>
        </span>
        <span className="ml-auto text-[12px] text-[var(--muted)]">GPT-4o</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {typing && (
          <div className="flex items-end gap-3 animate-fade-in">
            <div
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366F1, #22D3EE)" }}
            >
              <Bot size={15} color="white" />
            </div>
            <div
              className="px-4 py-3 flex items-center gap-1.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                borderRadius: "16px 16px 16px 4px",
              }}
            >
              <Loader type="dots" />
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-5 pb-5">
        <div
          className="flex items-end gap-3 p-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            placeholder="Ask about market sizing, pricing, growth strategy…"
            className="flex-1 bg-transparent border-none outline-none resize-none text-[var(--text)] placeholder:text-[var(--muted)] text-[14px] leading-relaxed pt-0.5"
            style={{ maxHeight: "120px" }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || typing}
            className="w-9 h-9 rounded-[9px] flex-shrink-0 flex items-center justify-center border-none transition-all duration-200"
            style={{
              background: input.trim() && !typing
                ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
                : "rgba(255,255,255,0.06)",
              boxShadow: input.trim() && !typing ? "0 0 16px rgba(99,102,241,0.35)" : "none",
              cursor: input.trim() && !typing ? "pointer" : "default",
            }}
          >
            <Send size={14} color={input.trim() && !typing ? "white" : "var(--muted)"} />
          </button>
        </div>
        <p className="text-center text-[11px] text-[var(--muted)] mt-2">
          Enter to send · Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
