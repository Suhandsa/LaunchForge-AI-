import { Bot } from "lucide-react";

/**
 * MessageBubble — single chat message.
 * Bold syntax: **text** → <strong>
 * @param {{ role: "user"|"ai", text: string }} message
 * @param {string} userName — first letter used for user avatar
 */
export default function MessageBubble({ message, userName = "J" }) {
  const isAI = message.role === "ai";

  // Parse **bold** markdown
  const parseText = (text) =>
    text.split("**").map((part, i) =>
      i % 2 === 1
        ? <strong key={i} style={{ color: "#A5B4FC" }}>{part}</strong>
        : part
    );

  return (
    <div
      className={`flex gap-3 items-end animate-fade-up ${isAI ? "" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      {isAI ? (
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6366F1, #22D3EE)" }}
        >
          <Bot size={15} color="white" />
        </div>
      ) : (
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[13px] font-bold text-white"
          style={{ background: "linear-gradient(135deg, #374151, #1F2937)" }}
        >
          {userName[0].toUpperCase()}
        </div>
      )}

      {/* Bubble */}
      <div
        className="max-w-[72%] px-4 py-3 text-[14px] leading-relaxed"
        style={{
          borderRadius: isAI ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
          background: isAI
            ? "rgba(255,255,255,0.04)"
            : "linear-gradient(135deg, #6366F1, #5254CC)",
          border: isAI ? "1px solid var(--border)" : "none",
          color: "var(--text)",
          whiteSpace: "pre-wrap",
        }}
      >
        {parseText(message.text)}
      </div>
    </div>
  );
}
