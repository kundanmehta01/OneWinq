import { useEffect, useState } from "react";
import { Button, Input, Select } from "../common/UI.jsx";
import { ASSIGNABLE_ROLES, memberDisplayName } from "../../hooks/useOrganizations.js";
import { discoverProfiles } from "../../services/discoveryService.js";

export default function InviteMember({ departments = [], onInvite }) {
  const [candidates, setCandidates] = useState([]);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [title, setTitle] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    discoverProfiles({ limit: 25 })
      .then((response) => {
        if (active) setCandidates(response.data?.items || []);
      })
      .catch(() => {
        if (active) setCandidates([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (!userId || submitting) return;
    setSubmitting(true);
    try {
      const payload = { userId, role };
      if (title.trim()) payload.title = title.trim();
      if (departmentId) payload.departmentId = departmentId;
      const success = await onInvite(payload);
      if (success) {
        setUserId("");
        setRole("MEMBER");
        setTitle("");
        setDepartmentId("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="invite-member panel" onSubmit={submit}>
      <h2>Add a member</h2>
      <Select
        label="Person"
        value={userId}
        onChange={(event) => setUserId(event.target.value)}
        required
      >
        <option value="">Select a person…</option>
        {candidates.map((profile) => (
          <option key={profile._id} value={profile.userId}>
            {memberDisplayName(profile)}
            {profile.designation ? ` — ${profile.designation}` : ""}
          </option>
        ))}
      </Select>
      <Select label="Role" value={role} onChange={(event) => setRole(event.target.value)}>
        {ASSIGNABLE_ROLES.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
      <Input
        label="Job title (optional)"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Product Manager"
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
      <Button type="submit" disabled={!userId || submitting}>
        {submitting ? "Adding…" : "Add member"}
      </Button>
    </form>
  );
}
