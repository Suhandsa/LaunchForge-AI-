/**
 * CreateTeamForm — form to create a new team
 */
import { useState } from "react";

export default function CreateTeamForm({ onSubmit, loading = false }) {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!teamName.trim()) {
      setError("Team name is required");
      return;
    }

    try {
      await onSubmit({ team_name: teamName });
      setTeamName("");
    } catch (err) {
      setError(err?.error || "Failed to create team");
    }
  };

  return (
    <div className="glass-card p-6 hover-lift">
      <h3 className="text-[15px] font-bold text-[var(--text)] mb-4">Create New Team</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[12px] font-semibold text-[var(--muted)] mb-2">
            Team Name
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g., LaunchGen Builders"
            className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[#6366F1] transition text-[13px]"
          />
        </div>

        {error && (
          <p className="text-[12px] text-[#EF4444]">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2.5 bg-[#6366F1] text-white font-semibold text-[13px] rounded-lg hover:bg-[#5254CC] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Creating..." : "Create Team"}
        </button>
      </form>
    </div>
  );
}
