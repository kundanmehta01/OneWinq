import { Link } from "react-router-dom";
import { Button } from "../common/UI.jsx";
const profileFrom = (item) =>
  item.requesterProfile ||
  item.recipientProfile ||
  item.requesterId?.profile ||
  item.recipientId?.profile ||
  {};
export default function ConnectionCard({ connection, onRemove }) {
  const profile = profileFrom(connection);
  const name =
    profile.displayName ||
    connection.requesterId?.email ||
    connection.recipientId?.email ||
    "Connection";
  return (
    <article className="connection-card">
      <div className="avatar">{name[0]}</div>
      <div>
        <strong>{name}</strong>
        <span>{profile.designation || "Professional connection"}</span>
      </div>
      <div className="connection-card-actions">
        {profile.slug && (
          <Link
            className="button secondary"
            to={`/connections/profile/${profile.slug}`}
          >
            View
          </Link>
        )}
        <Button variant="secondary" onClick={() => onRemove(connection._id)}>
          Remove
        </Button>
      </div>
    </article>
  );
}
