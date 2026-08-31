import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import RoleBadge from "./RoleBadge.jsx";
import { formatDate } from "../../hooks/useOrganizations.js";

const orgInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("") || "?";

export default function OrganizationCard({ membership }) {
  const org = membership.organization || membership;
  return (
    <article className="org-card panel">
      <div className="org-card-head">
        {org.logo ? (
          <img className="org-logo" src={org.logo} alt={`${org.name} logo`} />
        ) : (
          <span className="avatar">{orgInitials(org.name)}</span>
        )}
        <div>
          <h2>{org.name}</h2>
          <span>{org.domain || (org.slug ? `/${org.slug}` : "No domain set")}</span>
        </div>
      </div>
      <div className="org-card-meta">
        <RoleBadge role={membership.role} />
        <span className="badge">{org.plan || "FREE"} plan</span>
      </div>
      <p>Joined {formatDate(membership.joinedAt) || "recently"}</p>
      <Link className="button secondary" to={`/organizations/${org._id}`}>
        Open workspace
        <ArrowRight size={15} />
      </Link>
    </article>
  );
}
