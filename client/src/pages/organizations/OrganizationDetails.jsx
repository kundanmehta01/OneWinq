import { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Building2, Users } from "lucide-react";
import OrganizationHeader from "../../components/organizations/OrganizationHeader.jsx";
import { useOrganization } from "../../hooks/useOrganizations.js";
import { Button, Empty, Input, Loading, Select } from "../../components/common/UI.jsx";

function AddDepartmentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    try {
      await onAdd(trimmed);
      setName("");
      toast.success("Department created");
    } catch (err) {
      toast.error(err.message || "Unable to create the department.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="inline-form" onSubmit={submit}>
      <Input
        label="New department"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Engineering"
        minLength={2}
        required
      />
      <Button type="submit" disabled={busy || name.trim().length < 2}>
        {busy ? "Adding…" : "Add"}
      </Button>
    </form>
  );
}

function CreateTeamForm({ departments, onCreate }) {
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    try {
      await onCreate(trimmed, departmentId);
      setName("");
      setDepartmentId("");
      toast.success("Team created");
    } catch (err) {
      toast.error(err.message || "Unable to create the team.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="inline-form" onSubmit={submit}>
      <Input
        label="New team"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Platform squad"
        minLength={2}
        required
      />
      <Select
        label="Department (optional)"
        value={departmentId}
        onChange={(event) => setDepartmentId(event.target.value)}
      >
        <option value="">No department</option>
        {departments.map((department) => (
          <option key={department._id} value={department._id}>
            {department.name}
          </option>
        ))}
      </Select>
      <Button type="submit" disabled={busy || name.trim().length < 2}>
        {busy ? "Adding…" : "Add"}
      </Button>
    </form>
  );
}

export default function OrganizationDetails() {
  const { id } = useParams();
  const org = useOrganization(id);

  if (org.loading) return <div className="page"><Loading /></div>;
  if (org.error || !org.organization) {
    return (
      <div className="page">
        <Empty>{org.error || "Organization not found."}</Empty>
      </div>
    );
  }

  return (
    <div className="page">
      <OrganizationHeader
        organization={org.organization}
        metrics={org.metrics}
        canEdit={org.isAdmin}
      />
      <div className="org-columns">
        <section className="panel org-panel">
          <h2>
            <Building2 size={17} />
            Departments
          </h2>
          {org.departments.length ? (
            <ul className="dept-list">
              {org.departments.map((department) => (
                <li key={department._id}>
                  <strong>{department.name}</strong>
                  <span>
                    {department.headUserId ? "Has department head" : "No head assigned"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>No departments have been created yet.</Empty>
          )}
          {org.canManageStructure ? (
            <AddDepartmentForm onAdd={org.addDepartment} />
          ) : (
            <p className="org-note">Departments are managed by owners, admins and managers.</p>
          )}
        </section>
        <section className="panel org-panel">
          <h2>
            <Users size={17} />
            Teams
          </h2>
          {org.canManageStructure ? (
            <>
              <p className="org-note">
                Spin up a team and optionally attach it to a department.
              </p>
              <CreateTeamForm departments={org.departments} onCreate={org.addTeam} />
            </>
          ) : (
            <p className="org-note">Teams are managed by owners, admins and managers.</p>
          )}
        </section>
      </div>
    </div>
  );
}
