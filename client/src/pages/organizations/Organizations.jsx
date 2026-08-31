import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useMyOrganizations } from "../../hooks/useOrganizations.js";
import OrganizationCard from "../../components/organizations/OrganizationCard.jsx";
import EmptyOrganization from "../../components/organizations/EmptyOrganization.jsx";
import { Empty, Loading } from "../../components/common/UI.jsx";

export default function Organizations() {
  const { memberships, loading, error } = useMyOrganizations();

  return (
    <div className="page">
      <header>
        <div>
          <p className="eyebrow">Multi-tenant workspace</p>
          <h1>Organizations</h1>
        </div>
        <Link className="button" to="/organizations/new">
          <Plus size={16} />
          New organization
        </Link>
      </header>
      {loading ? (
        <Loading />
      ) : error ? (
        <Empty>{error}</Empty>
      ) : memberships.length ? (
        <div className="org-grid">
          {memberships.map((membership) => (
            <OrganizationCard
              key={membership.membershipId || membership.organization?._id}
              membership={membership}
            />
          ))}
        </div>
      ) : (
        <EmptyOrganization />
      )}
    </div>
  );
}
