import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyOrganization() {
  return (
    <div className="panel empty-organization">
      <Building2 size={30} />
      <h2>No organizations yet</h2>
      <p>
        Create a workspace to bring your team together — manage departments,
        members and roles from one place.
      </p>
      <Link className="button" to="/organizations/new">
        Create organization
      </Link>
    </div>
  );
}
