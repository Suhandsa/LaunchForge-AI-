import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBox from "../../components/chat/ChatBox";
import { ideaService } from "../../services/ideaService";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";

export default function ChatPage() {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      setLoading(true);
      const data = await ideaService.getAllIdeas();
      if (data && data.length > 0) {
        setIdeas(data);
        // Auto-select the first idea
        setSelectedIdea(data[0]);
      }
    } catch (err) {
      console.error("Failed to load ideas:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader type="spinner" text="Loading ideas..." />;
  }

  if (!ideas || ideas.length === 0) {
    return (
      <div>
        <div className="mb-5">
          <h1 className="text-[24px] font-extrabold text-[var(--text)] mb-1">AI Strategy Chat</h1>
          <p className="text-[14px] text-[var(--muted)]">
            Your AI co-founder — deep expertise in startups, markets, and growth.
          </p>
        </div>
        <div className="glass-card p-8 text-center">
          <p className="text-[var(--muted)] mb-4">No ideas yet. Generate one first!</p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-[24px] font-extrabold text-[var(--text)] mb-1">
          AI Strategy Chat
        </h1>
        <p className="text-[14px] text-[var(--muted)]">
          Your AI co-founder — deep expertise in startups, markets, and growth.
        </p>
      </div>

      {/* Idea selector */}
      {ideas.length > 1 && (
        <div className="mb-5 glass-card p-4">
          <label className="text-[13px] font-semibold text-[var(--text)] mb-3 block">
            Select Idea to Chat About:
          </label>
          <div className="flex gap-2 flex-wrap">
            {ideas.map((idea) => (
              <button
                key={idea.id}
                onClick={() => setSelectedIdea(idea)}
                className="px-4 py-2 rounded-lg text-[13px] font-medium transition-all"
                style={{
                  background:
                    selectedIdea?.id === idea.id
                      ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
                      : "rgba(255,255,255,0.05)",
                  border:
                    selectedIdea?.id === idea.id
                      ? "1px solid rgba(99,102,241,0.5)"
                      : "1px solid var(--border)",
                  color: "var(--text)",
                }}
              >
                {idea.idea_text.substring(0, 30)}...
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat component */}
      {selectedIdea && (
        <ChatBox
          ideaContext={selectedIdea.idea_text}
          ideaId={selectedIdea.id}
        />
      )}
    </div>
  );
}
