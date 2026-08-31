import { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import OrganizationHeader from "../../components/organizations/OrganizationHeader.jsx";
import InviteMember from "../../components/organizations/InviteMember.jsx";
import MembersList from "../../components/organizations/MembersList.jsx";
import { useOrganization } from "../../hooks/useOrganizations.js";
import { Empty, Loading } from "../../components/common/UI.jsx";

export default function Members() {
  const { id } = useParams();
  const org = useOrganization(id);
  const [busyId, setBusyId] = useState(null);

  if (org.loading) return <div className="page"><Loading /></div>;
  if (org.error || !org.organization) {
    return (
      <div className="page">
        <Empty>{org.error || "Organization not found."}</Empty>
      </div>
    );
  }

  const handleInvite = async (payload) => {
    try {
      await org.invite(payload);
      toast.success("Member added to the organization");
      return true;
    } catch (err) {
      toast.error(err.message || "Unable to add the member.");
      return false;
    }
  };

  const handleChangeRole = async (membershipId, role) => {
    setBusyId(membershipId);
    try {
      await org.changeRole(membershipId, role);
      toast.success("Member role updated");
    } catch (err) {
      toast.error(err.message || "Unable to update the member role.");
    } finally {
      setBusyId(null);
    }
  };

  const handleRemove = async (membershipId) => {
    if (!window.confirm("Remove this member from the organization?")) return;
    setBusyId(membershipId);
    try {
      await org.kick(membershipId);
      toast.success("Member removed");
    } catch (err) {
      toast.error(err.message || "Unable to remove the member.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="page">
      <OrganizationHeader
        organization={org.organization}
        metrics={org.metrics}
        canEdit={org.isAdmin}
      />
      {org.isAdmin ? (
        <InviteMember departments={org.departments} onInvite={handleInvite} />
      ) : (
        <p className="org-note">Only owners and admins can add new members.</p>
      )}
      <MembersList
        members={org.members}
        pagination={org.pagination}
        page={org.membersPage}
        onPageChange={org.setMembersPage}
        canManage={org.isAdmin}
        busyId={busyId}
        onChangeRole={handleChangeRole}
        onRemove={handleRemove}
      />
    </div>
  );
}
