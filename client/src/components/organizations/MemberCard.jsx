import { Trash2 } from "lucide-react";
import RoleBadge from "./RoleBadge.jsx";
import { ASSIGNABLE_ROLES, formatDate, memberContact, memberDisplayName } from "../../hooks/useOrganizations.js";

const initialsOf = (name = "") =>
  name
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("") || "?";

export default function MemberCard({ member, canManage, busy, onChangeRole, onRemove }) {
  const name = memberDisplayName(member.user);
  const contact = memberContact(member.user);
  const isOwnerRow = member.role === "OWNER";
  return (
    <article className="member-card panel">
      <span className="avatar">{initialsOf(name)}</span>
      <div className="member-info">
        <strong>{name}</strong>
        <span>
          {member.title || member.user?.designation || contact || "Member"}
        </span>
        <span>
          {member.department ? `${member.department} · ` : ""}
          Joined {formatDate(member.joinedAt)}
        </span>
      </div>
      <div className="member-actions">
        <RoleBadge role={member.role} />
        {canManage && !isOwnerRow && (
          <>
            <select
              aria-label={`Change role for ${name}`}
              value={member.role}
              disabled={busy}
              onChange={(event) => onChangeRole(member.membershipId, event.target.value)}
            >
              {ASSIGNABLE_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="icon-button danger"
              aria-label={`Remove ${name}`}
              disabled={busy}
              onClick={() => onRemove(member.membershipId)}
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </article>
  );
}
