import ProfileImage from "./ProfileImage.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { resolveProfileName } from "../../utils/name.js";

export default function ProfileHeader({ profile, publicView = false }) {
  const { user } = useAuth();
  const name = resolveProfileName(profile, publicView ? null : user);
  return (
    <header className="profile-header">
      <ProfileImage profile={profile} large name={name} />
      <div>
        <h1>{name}</h1>
        <p>{profile?.designation || profile?.introduction || "Professional"}</p>
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
