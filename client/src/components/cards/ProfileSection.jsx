export default function ProfileSection({ profile, layout }) {
  if (!profile) return null;
  return (
    <div className="card-profile-section">
      {layout?.showPhoto && (
        <div className="card-avatar">
          {profile.profilePhoto?.url ? (
            <img src={profile.profilePhoto.url} alt="Profile" />
          ) : (
            (profile.displayName || "?")[0]
          )}
        </div>
      )}
      <div>
        <h2>
          {profile.displayName ||
            [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
            "Your name"}
        </h2>
        {layout?.showHeadline && (
          <p>
            {profile.designation ||
              profile.introduction ||
              "Your professional headline"}
          </p>
        )}
        {profile.contact?.location && <small>{profile.contact.location}</small>}
      </div>
    </div>
  );
}
