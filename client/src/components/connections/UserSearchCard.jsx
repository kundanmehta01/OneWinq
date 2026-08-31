import { Link } from "react-router-dom";
import { Button } from "../common/UI.jsx";
export default function UserSearchCard({ profile, onConnect }) {
  const name = profile.displayName || "OneWinq member";
  return (
    <article className="user-search-card">
      <div className="avatar">{name[0]}</div>
      <h3>{name}</h3>
      <p>{profile.designation || "Professional"}</p>
      <small>{profile.contact?.location || "OneWinq network"}</small>
      <div>
        <Link
          className="button secondary"
          to={`/connections/profile/${profile.slug}`}
        >
          View
        </Link>
        <Button
          onClick={() => onConnect(profile.userId?._id || profile.userId)}
        >
          Connect
        </Button>
      </div>
    </article>
  );
}
