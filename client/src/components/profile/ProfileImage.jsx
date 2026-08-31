import { nameInitial } from "../../utils/name.js";

export default function ProfileImage({ profile, large = false, name }) {
  const resolved =
    name ||
    profile?.displayName ||
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    "OneWinq member";
  return (
    <div className={`profile-image ${large ? "large" : ""}`}>
      {profile?.profilePhoto?.url ? (
        <img src={profile.profilePhoto.url} alt={resolved} />
      ) : (
        nameInitial(resolved)
      )}
    </div>
  );
}
