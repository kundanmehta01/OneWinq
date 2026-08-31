import { Link } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile.js";
import ProfilePreview from "../../components/profile/ProfilePreview.jsx";
import { Empty, Loading } from "../../components/common/UI.jsx";
export default function Profile() {
  const { profile, loading, error } = useProfile();
  if (loading) return <Loading />;
  if (error) return <Empty>{error}</Empty>;
  return (
    <div className="page profile-page">
      <header>
        <div>
          <p className="eyebrow">Digital identity</p>
          <h1>My profile</h1>
        </div>
        <div className="profile-page-actions">
          <Link className="button secondary" to={`/profiles/${profile.slug}`}>
            Public view
          </Link>
          <Link className="button primary" to="/profile/edit">
            Edit profile
          </Link>
        </div>
      </header>
      <ProfilePreview profile={profile} />
    </div>
  );
}
