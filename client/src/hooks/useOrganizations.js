import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {
  getMyOrganizations,
  createOrganization,
  getOrganization,
  updateOrganization,
  getDepartments,
  createDepartment,
  createTeam,
  getMembers,
  addMember,
  updateMemberRole,
  removeMember,
} from "../services/organizationService.js";

export const ASSIGNABLE_ROLES = ["ADMIN", "MANAGER", "MEMBER", "GUEST"];
export const CARD_THEMES = [
  "CLASSIC",
  "MODERN",
  "MINIMAL",
  "DARK_LUXURY",
  "NEON_VIBRANT",
];

const isSameId = (a, b) => Boolean(a && b) && String(a) === String(b);

// Member `user` is either a populated profile document (userId + displayName)
// or a bare user document ({_id, email, phone}) when no profile exists.
export const memberDisplayName = (user) => {
  if (!user) return "OneWinq member";
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return (
    user.displayName ||
    fullName ||
    user.email ||
    user.phone ||
    (user.slug ? `@${user.slug}` : "OneWinq member")
  );
};

export const memberContact = (user) => user?.email || user?.phone || "";

export const formatDate = (dateInput) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Workspace list hook: memberships returned by GET /organizations/my, where
// each item is {membershipId, role, title, joinedAt, organization}.
export function useMyOrganizations() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyOrganizations()
      .then((response) => setMemberships(response.data || []))
      .catch((err) => setError(err.message || "Unable to load organizations."))
      .finally(() => setLoading(false));
  }, []);

  const create = useCallback(async (payload) => {
    const response = await createOrganization(payload);
    const created = response.data;
    setMemberships((prev) => [
      {
        membershipId: null,
        role: "OWNER",
        title: "Founder / Organization Owner",
        joinedAt: new Date().toISOString(),
        organization: created,
      },
      ...prev,
    ]);
    return created;
  }, []);

  return { memberships, loading, error, create };
}

// Single workspace hook: organization details, departments, paginated member
// directory and the caller's own membership (for role-based UI gating).
export function useOrganization(orgId) {
  const { user } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [members, setMembers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [membersPage, setMembersPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      getOrganization(orgId),
      getDepartments(orgId).catch(() => ({ data: [] })),
      getMembers(orgId, { page: membersPage }).catch(() => ({
        data: { items: [], pagination: null },
      })),
    ])
      .then(([orgResponse, deptResponse, memberResponse]) => {
        if (!active) return;
        setOrganization(orgResponse.data?.organization || null);
        setMetrics(orgResponse.data?.metrics || null);
        setDepartments(deptResponse.data || []);
        setMembers(memberResponse.data?.items || []);
        setPagination(memberResponse.data?.pagination || null);
        setError("");
      })
      .catch(
        (err) =>
          active && setError(err.message || "Unable to load the organization."),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [orgId, membersPage, reloadKey]);

  const myMembership = useMemo(
    () =>
      members.find(
        (member) =>
          isSameId(member.user?.userId, user?._id) ||
          isSameId(member.user?._id, user?._id),
      ) || null,
    [members, user],
  );

  const role = myMembership?.role || "";
  const isOwner = role === "OWNER";
  const isAdmin = isOwner || role === "ADMIN";
  const canManageStructure = isAdmin || role === "MANAGER";

  // Mutations funnel through `refresh` (bumps reloadKey) so the effect above
  // stays the single source of truth for fetching.
  const refresh = useCallback(() => setReloadKey((key) => key + 1), []);

  const save = useCallback(
    async (patch) => {
      const response = await updateOrganization(orgId, patch);
      setOrganization(response.data);
      return response.data;
    },
    [orgId],
  );

  const addDepartment = useCallback(
    async (name) => {
      await createDepartment(orgId, { name });
      refresh();
    },
    [orgId, refresh],
  );

  const addTeam = useCallback(
    async (name, departmentId) => {
      await createTeam(
        orgId,
        departmentId ? { name, departmentId } : { name },
      );
    },
    [orgId],
  );

  const invite = useCallback(
    async (payload) => {
      await addMember(orgId, payload);
      refresh();
    },
    [orgId, refresh],
  );

  const changeRole = useCallback(
    async (membershipId, nextRole) => {
      await updateMemberRole(orgId, membershipId, nextRole);
      refresh();
    },
    [orgId, refresh],
  );

  const kick = useCallback(
    async (membershipId) => {
      await removeMember(orgId, membershipId);
      refresh();
    },
    [orgId, refresh],
  );

  return {
    user,
    organization,
    metrics,
    departments,
    members,
    pagination,
    membersPage,
    setMembersPage,
    loading,
    error,
    myMembership,
    role,
    isOwner,
    isAdmin,
    canManageStructure,
    refresh,
    save,
    addDepartment,
    addTeam,
    invite,
    changeRole,
    kick,
  };
}
