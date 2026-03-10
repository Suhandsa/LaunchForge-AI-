/**
 * InviteMemberForm — invite a team member by email
 */
import { useState } from "react";

export default function InviteMemberForm({ teamId, onSubmit, loading = false }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      await onSubmit({ team_id: teamId, user_email: email });
      setEmail("");
    } catch (err) {
      setError(err?.error || "Failed to invite member");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-[12px] font-semibold text-[var(--muted)] mb-2">
          Invite Team Member
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="teammate@example.com"
            className="flex-1 px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[#6366F1] transition text-[13px]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#6366F1] text-white font-semibold text-[13px] rounded-lg hover:bg-[#5254CC] disabled:opacity-50 transition"
          >
            {loading ? "..." : "Invite"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-[12px] text-[#EF4444]">{error}</p>
      )}
    </form>
  );
}
