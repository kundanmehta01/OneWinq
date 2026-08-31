import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import OrganizationForm from "../../components/organizations/OrganizationForm.jsx";
import { createOrganization } from "../../services/organizationService.js";

export default function CreateOrganization() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const submit = async (payload) => {
    setBusy(true);
    try {
      const response = await createOrganization(payload);
      toast.success("Organization created");
      navigate(`/organizations/${response.data._id}`);
    } catch (err) {
      toast.error(err.message || "Unable to create the organization.");
      setBusy(false);
    }
  };

  return (
    <div className="page">
      <header>
        <div>
          <p className="eyebrow">New workspace</p>
          <h1>Create organization</h1>
        </div>
        <Link className="button secondary" to="/organizations">
          <ArrowLeft size={15} />
          Back
        </Link>
      </header>
      <OrganizationForm
        submitLabel="Create organization"
        busy={busy}
        onSubmit={submit}
      />
    </div>
  );
}
