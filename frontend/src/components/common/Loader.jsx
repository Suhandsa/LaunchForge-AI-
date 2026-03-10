/**
 * Loader — fullscreen or inline spinner
 * @param {"fullscreen"|"inline"|"dots"} type
 */
export default function Loader({ type = "inline", text = "Loading…" }) {
  if (type === "fullscreen") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg)]">
        <div className="relative mb-5">
          <div className="w-12 h-12 border-2 border-white/10 border-t-[var(--primary)] rounded-full animate-spin-fast" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[var(--primary)] opacity-60 animate-pulse" />
          </div>
        </div>
        <p className="text-sm text-[var(--muted)]">{text}</p>
      </div>
    );
  }

  if (type === "block") {
    return (
      <div className="glass-card p-8 mt-5 flex flex-col items-center justify-center">
        <div className="relative mb-4">
          <div className="w-10 h-10 border-2 border-white/10 border-t-[var(--primary)] rounded-full animate-spin-fast" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[var(--primary)] opacity-60 animate-pulse" />
          </div>
        </div>
        <p className="text-sm text-[var(--muted)] text-center">{text}</p>
      </div>
    );
  }

  if (type === "dots") {
    return (
      <div className="flex items-center gap-1.5 py-2">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    );
  }

  // inline
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-4 h-4 border-2 border-white/20 border-t-[var(--primary)] rounded-full animate-spin-fast" />
      <span className="text-sm text-[var(--muted)]">{text}</span>
    </div>
  );
}
