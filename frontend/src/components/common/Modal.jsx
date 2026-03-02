import { useEffect } from "react";
import { X } from "lucide-react";
import Button from "./Button";

/**
 * Modal — accessible dialog overlay
 * @param {boolean}  open
 * @param {Function} onClose
 * @param {string}   title
 * @param {string}   [size] "sm"|"md"|"lg"
 */
export default function Modal({ open, onClose, title, children, size = "md", footer }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const maxW = { sm: "400px", md: "540px", lg: "720px" }[size] || "540px";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="glass-card w-full animate-fade-up"
        style={{ maxWidth: maxW }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h3 className="text-base font-bold text-[var(--text)]">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div
            className="px-6 py-4 flex items-center justify-end gap-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
