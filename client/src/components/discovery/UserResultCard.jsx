import { Link } from "react-router-dom";
import { Button } from "../common/UI.jsx";
export default function UserResultCard({ profile, onConnect, onView }) {
  const name = profile.displayName || "OneWinq member";
  return (
    <article className="discovery-user-card">
      <div className="avatar">
        {profile.profilePhoto?.url ? (
          <img src={profile.profilePhoto.url} alt="" />
        ) : (
          name[0]
        )}
      </div>
      <h3>{name}</h3>
      <p>{profile.designation || "Professional"}</p>
      <small>{profile.contact?.location || "OneWinq community"}</small>
      {profile.skills?.length > 0 && (
        <div className="result-skills">
          {profile.skills.slice(0, 3).map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      )}
      <div className="result-actions">
        <Link
          className="button secondary"
          to={`/connections/profile/${profile.slug}`}
          onClick={() => onView(profile._id)}
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
