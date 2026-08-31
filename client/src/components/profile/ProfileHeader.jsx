import ProfileImage from "./ProfileImage.jsx";
export default function ProfileHeader({ profile, publicView = false }) {
  const name =
    profile?.displayName ||
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    "OneWinq member";
  return (
    <header className="profile-header">
      <ProfileImage profile={profile} large />
      <div>
        <h1>{name}</h1>
        <p>{profile?.designation || "Professional"}</p>
        {profile?.contact?.location && (
          <small>{profile.contact.location}</small>
        )}
      </div>
      {!publicView && (
        <span className="badge">
          {profile?.completionPercentage || 0}% complete
        </span>
      )}
    </header>
  );
}
