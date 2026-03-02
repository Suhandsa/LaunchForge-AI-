import { cx } from "../../utils/helpers";

/**
 * Button — shared button component
 *
 * @param {"primary"|"ghost"|"danger"|"success"} variant
 * @param {"sm"|"md"|"lg"} size
 */
export default function Button({
  children,
  variant  = "primary",
  size     = "md",
  loading  = false,
  icon,
  iconRight,
  className = "",
  disabled,
  ...props
}) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-[10px] transition-all duration-200 border border-transparent cursor-pointer select-none";

  const variants = {
    primary: "btn-primary text-white border-transparent",
    ghost:   "btn-ghost text-[var(--text)]",
    danger:  "bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.3)] text-[#EF4444] hover:bg-[rgba(239,68,68,0.2)]",
    success: "bg-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.3)] text-[#10B981] hover:bg-[rgba(16,185,129,0.2)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cx(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-fast" />
      ) : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
}
