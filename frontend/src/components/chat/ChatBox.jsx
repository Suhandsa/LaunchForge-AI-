import { useState, useRef, useEffect } from "react";
import { Send, Bot, Settings } from "lucide-react";
import MessageBubble from "./MessageBubble";
import Loader from "../common/Loader";
import { chatService } from "../../services/chatService";

/**
 * ChatBox — full ChatGPT-style interface with AI co-founder.
 * @param {string} ideaContext — name / description of the current idea
 * @param {string} ideaId — the UUID of the current idea
 */
export default function ChatBox({ ideaContext = "Your Startup Idea", ideaId = null }) {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `Welcome! I'm your AI co-founder. Let's discuss your startup idea. Ask me anything about market sizing, product strategy, pricing, go-to-market plans, funding, team structure – I'm here to help!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const endRef = useRef(null);

  const scrollToBottom = () =>
    endRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom, [messages, typing]);

  // Load chat history when idea changes
  useEffect(() => {
    if (ideaId) {
      loadChatHistory();
    }
  }, [ideaId]);

  const loadChatHistory = async () => {
    try {
      if (!ideaId) return;
      setLoadingHistory(true);
      const history = await chatService.getChatHistory(ideaId);
      if (history && history.length > 0) {
        const formattedMessages = history.map((msg) => [
          { role: "user", text: msg.message },
          { role: "ai", text: msg.response },
        ]).flat();
        // Add welcome message + history
        setMessages([
          {
            role: "ai",
            text: `Welcome! I'm your AI co-founder. Let's discuss your startup idea. Ask me anything about market sizing, product strategy, pricing, go-to-market plans, funding, team structure – I'm here to help!`,
          },
          ...formattedMessages,
        ]);
      }
    } catch (err) {
      console.error("Failed to load chat history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || typing) return;

    if (!ideaId) {
      setError("Please select or create an idea first");
      return;
    }

    // Add user message immediately
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setError(null);

    try {
      const response = await chatService.sendMessage(ideaId, text);
      setTyping(false);
      
      // Add AI response
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: response.response || response.reply || "I'm thinking about that...",
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setTyping(false);
      setError(err?.error || err?.message || "Failed to send message");
      // Remove the user message if request failed
      setMessages((m) => m.slice(0, -1));
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="glass-card flex flex-col overflow-hidden" style={{ height: "calc(100vh - 60px - 120px)" }}>
      {/* Context bar */}
      <div
        className="flex items-center gap-2.5 px-5 py-3.5 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span className="w-2 h-2 rounded-full animate-pulse bg-green-500" />
        <span className="text-[13px] text-[var(--text)]">
          Chatting about:{" "}
          <strong className="text-[#A5B4FC]">{ideaContext}</strong>
        </span>
        <span className="ml-auto text-[12px] text-[var(--muted)] flex items-center gap-1">
          <Bot size={12} /> Gemini Pro
        </span>
      </div>

      {/* Error message */}
      {error && (
        <div className="px-5 py-3 bg-red-500/10 border-b border-red-500/30 text-red-400 text-sm flex items-center gap-2">
          <Settings size={14} />
          {error}
        </div>
      )}

      {/* Loading history */}
      {loadingHistory && (
        <div className="flex-1 flex items-center justify-center">
          <Loader type="dots" />
        </div>
      )}

      {/* Messages */}
      {!loadingHistory && (
        <>
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
                disabled={!ideaId || typing}
                rows={1}
                placeholder={ideaId ? "Ask about market sizing, pricing, growth strategy…" : "Select an idea first"}
                className="flex-1 bg-transparent border-none outline-none resize-none text-[var(--text)] placeholder:text-[var(--muted)] text-[14px] leading-relaxed pt-0.5 disabled:opacity-50"
                style={{ maxHeight: "120px" }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || typing || !ideaId}
                className="w-9 h-9 rounded-[9px] flex-shrink-0 flex items-center justify-center border-none transition-all duration-200"
                style={{
                  background: input.trim() && !typing && ideaId
                    ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
                    : "rgba(255,255,255,0.06)",
                  boxShadow: input.trim() && !typing && ideaId ? "0 0 16px rgba(99,102,241,0.35)" : "none",
                  cursor: input.trim() && !typing && ideaId ? "pointer" : "default",
                }}
                title={!ideaId ? "Create an idea first" : "Send message"}
              >
                <Send size={14} color={input.trim() && !typing && ideaId ? "white" : "var(--muted)"} />
              </button>
            </div>
            <p className="text-center text-[11px] text-[var(--muted)] mt-2">
              Enter to send · Shift + Enter for new line
            </p>
          </div>
        </>
      )}
    </div>
  );
}
