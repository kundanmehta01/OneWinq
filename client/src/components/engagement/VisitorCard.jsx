import { timeAgo } from "../../hooks/useEngagement.js";

const initialsOf = (value = "") =>
  value
    .split(/[@.\s]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";

export default function VisitorCard({ view }) {
  if (!view) return null;
  const viewer = view.viewerId || {};
  const label = viewer.email || viewer.phone || "Anonymous member";
  return (
    <article className="visitor-card panel">
      <div className="avatar">{initialsOf(label)}</div>
      <div>
        <strong>{label}</strong>
        <span>Viewed your profile {timeAgo(view.viewedAt)}</span>
      </div>
    </article>
  );
}
