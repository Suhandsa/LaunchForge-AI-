/**
 * TeamCard — displays a single team with members
 */
export default function TeamCard({ team = {}, onLeave, isOwner = false }) {
  const { id, team_name = "Untitled Team", members = [], created_at } = team;

  return (
    <div className="glass-card hover-lift p-5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-[var(--text)]">{team_name}</h3>
          <p className="text-[12px] text-[var(--muted)]">
            {members.length} member{members.length !== 1 ? 's' : ''}
          </p>
        </div>
        {isOwner && (
          <span className="px-2 py-1 text-[10px] font-bold bg-[#6366F1] text-white rounded">
            OWNER
          </span>
        )}
      </div>

      {/* Members list */}
      <div className="space-y-2 mb-4">
        {members.slice(0, 3).map((member, i) => (
          <p key={i} className="text-[12px] text-[var(--muted)]">
            • {member.email} 
            {member.role === 'owner' && <span className="text-[#6366F1] text-[10px]"> (owner)</span>}
          </p>
        ))}
        {members.length > 3 && (
          <p className="text-[12px] text-[var(--muted)]">
            +{members.length - 3} more...
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 text-[12px] font-semibold bg-[#6366F1] text-white rounded hover:bg-[#5254CC] transition">
          View Details
        </button>
        {!isOwner && (
          <button 
            onClick={() => onLeave(id)}
            className="flex-1 px-3 py-2 text-[12px] font-semibold border border-[#EF4444] text-[#EF4444] rounded hover:bg-[rgba(239,68,68,0.1)] transition"
          >
            Leave
          </button>
        )}
      </div>
    </div>
  );
}
