import { NavLink, Link } from "react-router-dom";
import { Pencil } from "lucide-react";

const orgInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("") || "?";

export default function OrganizationHeader({ organization, metrics, canEdit }) {
  if (!organization) return null;
  const base = `/organizations/${organization._id}`;
  return (
    <section className="org-header panel">
      <div className="org-header-top">
        {organization.logo ? (
          <img
            className="org-logo large"
            src={organization.logo}
            alt={`${organization.name} logo`}
          />
        ) : (
          <span className="avatar large">{orgInitials(organization.name)}</span>
        )}
        <div>
          <h1>{organization.name}</h1>
          <span>
            {organization.domain ||
              (organization.slug ? `/${organization.slug}` : "No domain set")}
            {" · "}
            {organization.plan || "FREE"} plan
          </span>
        </div>
        {canEdit && (
          <Link className="button secondary org-edit" to={`${base}/edit`}>
            <Pencil size={15} />
            Edit
          </Link>
        )}
      </div>
      <div className="metrics">
        <div className="metric">
          <strong>{metrics?.totalMembers ?? 0}</strong>
          <span>Members</span>
        </div>
        <div className="metric">
          <strong>{metrics?.totalDepartments ?? 0}</strong>
          <span>Departments</span>
        </div>
        <div className="metric">
          <strong>{organization.status || "ACTIVE"}</strong>
          <span>Status</span>
        </div>
      </div>
      <nav className="org-tabs">
        <NavLink to={base} end>
          Overview
        </NavLink>
        <NavLink to={`${base}/members`}>Members</NavLink>
        <NavLink to={`${base}/settings`}>Settings</NavLink>
      </nav>
    </section>
  );
}
