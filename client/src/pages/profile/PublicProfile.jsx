import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPublicProfile } from "../../services/profileService.js";
import ProfilePreview from "../../components/profile/ProfilePreview.jsx";
import { Empty, Loading } from "../../components/common/UI.jsx";

export default function PublicProfile() {
  const { slug } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    getPublicProfile(slug)
      .then((response) => setProfile(response.data))
      .catch((err) => setError(err.message));
  }, [slug]);

  if (error)
    return (
      <div className="public-profile-page">
        <div className="public-profile-wrap">
          <Empty>{error}</Empty>
        </div>
      </div>
    );
  if (!profile) return <Loading />;

  return (
    <div className="public-profile-page">
      <div className="public-profile-wrap">
        <header className="public-topbar">
          <span className="brand">
            one<span>winq</span>
          </span>
          <span className="public-tag">Public profile</span>
        </header>
        <ProfilePreview profile={profile} publicView />
        <footer className="public-footer">
          <div>
            <strong>Want a professional presence like this?</strong>
            <span>Build your profile and digital card on OneWinq for free.</span>
          </div>
          <Link className="button primary" to="/signup">
            Create your profile
          </Link>
        </footer>
      </div>
    </div>
  );
}
