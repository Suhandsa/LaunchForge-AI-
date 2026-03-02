import ChatBox from "../../components/chat/ChatBox";

export default function ChatPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-[24px] font-extrabold text-[var(--text)] mb-1">AI Strategy Chat</h1>
        <p className="text-[14px] text-[var(--muted)]">
          Your AI co-founder — deep expertise in startups, markets, and growth.
        </p>
      </div>

      <ChatBox ideaContext="AI Fitness App for Students" />
    </div>
  );
}
