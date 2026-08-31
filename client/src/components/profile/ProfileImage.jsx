export default function ProfileImage({ profile, large = false }) {
  const name =
    profile?.displayName ||
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    "?";
  return (
    <div className={`profile-image ${large ? "large" : ""}`}>
      {profile?.profilePhoto?.url ? (
        <img src={profile.profilePhoto.url} alt={name} />
      ) : (
        name[0].toUpperCase()
      )}
    </div>
  );
}
