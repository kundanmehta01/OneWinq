import { Link } from "react-router-dom";
export default function ProfileCard({ profile }) {
  const name =
    profile?.displayName ||
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    "Complete your profile";
  return (
    <article className="panel dashboard-profile-card">
      <div className="avatar">{name[0]}</div>
      <div>
        <h2>{name}</h2>
        <p>{profile?.designation || "Add a professional headline"}</p>
        <span className="badge">
          {profile?.completionPercentage || 0}% complete
        </span>
      </div>
      <Link to="/profile" className="button secondary">
        Edit profile
      </Link>
    </article>
  );
}
