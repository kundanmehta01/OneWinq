import { nameInitial } from "../../utils/name.js";

export default function ProfileSection({ profile, layout, fallbackName }) {
  if (!profile) return null;
  const name =
    profile.displayName ||
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    fallbackName ||
    "OneWinq member";
  const headline =
    profile.designation || profile.introduction || "Professional";
  return (
    <div className="card-profile-section">
      {layout?.showPhoto && (
        <div className="card-avatar">
          {profile.profilePhoto?.url ? (
            <img src={profile.profilePhoto.url} alt={name} />
          ) : (
            nameInitial(name)
          )}
        </div>
      )}
      <div>
        <h2>{name}</h2>
        {layout?.showHeadline && <p>{headline}</p>}
        {profile.contact?.location && <small>{profile.contact.location}</small>}
      </div>
    </div>
  );
}
