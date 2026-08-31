const ROLE_CLASSES = {
  OWNER: "role-owner",
  ADMIN: "role-admin",
  MANAGER: "role-manager",
  MEMBER: "role-member",
  GUEST: "role-guest",
};

export default function RoleBadge({ role }) {
  return (
    <span className={`badge role-badge ${ROLE_CLASSES[role] || "role-member"}`}>
      {role || "MEMBER"}
    </span>
  );
}
