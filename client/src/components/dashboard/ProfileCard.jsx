import { Link } from "react-router-dom";

export default function ProfileCard({ profile }) {
  const name =
    profile?.displayName ||
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    "Complete your profile";
  const completion = profile?.completionPercentage || 0;
  return (
    <article className="panel dashboard-profile-card">
      <div className="avatar">{name[0]}</div>
      <div>
        <h2>{name}</h2>
        <p>{profile?.designation || "Add a professional headline"}</p>
        <div className="profile-progress">
          <strong>{completion}%</strong>
          <div>
            <span>
              <i style={{ width: `${completion}%` }} />
            </span>
            <small>Profile completion</small>
          </div>
        </div>
      </div>
      <Link to="/profile" className="button secondary">
        Edit profile
      </Link>
    </article>
  );
}
