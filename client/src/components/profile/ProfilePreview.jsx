import ProfileHeader from "./ProfileHeader.jsx";
import ProfileInfo from "./ProfileInfo.jsx";
export default function ProfilePreview({ profile, publicView = false }) {
  return (
    <article className={`profile-preview ${publicView ? "public" : ""}`}>
      <ProfileHeader profile={profile} publicView={publicView} />
      <ProfileInfo profile={profile} publicView={publicView} />
    </article>
  );
}
