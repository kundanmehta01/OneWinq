import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        <Empty>{error}</Empty>
      </div>
    );
  if (!profile) return <Loading />;
  return (
    <div className="public-profile-page">
      <ProfilePreview profile={profile} publicView />
    </div>
  );
}
