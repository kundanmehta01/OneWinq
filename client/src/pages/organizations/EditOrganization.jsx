import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import OrganizationForm from "../../components/organizations/OrganizationForm.jsx";
import { useOrganization } from "../../hooks/useOrganizations.js";
import { Empty, Loading } from "../../components/common/UI.jsx";

export default function EditOrganization() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { organization, loading, error, isAdmin, save } = useOrganization(id);
  const [busy, setBusy] = useState(false);

  if (loading) return <div className="page"><Loading /></div>;
  if (error || !organization) {
    return (
      <div className="page">
        <Empty>{error || "Organization not found."}</Empty>
        <Link className="button secondary" to="/organizations">
          Back to organizations
        </Link>
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="page">
        <Empty>Only organization owners and admins can edit this workspace.</Empty>
        <Link className="button secondary" to={`/organizations/${id}`}>
          Back to overview
        </Link>
      </div>
    );
  }

  const submit = async (payload) => {
    setBusy(true);
    try {
      await save(payload);
      toast.success("Organization updated");
      navigate(`/organizations/${id}`);
    } catch (err) {
      toast.error(err.message || "Unable to update the organization.");
      setBusy(false);
    }
  };

  return (
    <div className="page">
      <header>
        <div>
          <p className="eyebrow">Edit workspace</p>
          <h1>{organization.name}</h1>
        </div>
        <Link className="button secondary" to={`/organizations/${id}`}>
          <ArrowLeft size={15} />
          Cancel
        </Link>
      </header>
      <OrganizationForm
        initial={organization}
        submitLabel="Save changes"
        busy={busy}
        onSubmit={submit}
      />
    </div>
  );
}
