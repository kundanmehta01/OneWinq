import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getPublicProfile } from "../../services/profileService.js";
import { sendConnectionRequest } from "../../services/connectionService.js";
import ProfilePreview from "../../components/profile/ProfilePreview.jsx";
import { Button, Empty, Loading } from "../../components/common/UI.jsx";
export default function ConnectionProfile() {
  const { slug } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    getPublicProfile(slug)
      .then((response) => setProfile(response.data))
      .catch((err) => setError(err.message));
  }, [slug]);
  if (error) return <Empty>{error}</Empty>;
  if (!profile) return <Loading />;
  const connect = async () => {
    try {
      await sendConnectionRequest(profile.userId?._id || profile.userId);
      toast.success("Connection request sent");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="page connection-profile-page">
      <header>
        <div>
          <p className="eyebrow">Professional profile</p>
          <h1>Connect with this person</h1>
        </div>
        <Button onClick={connect}>Connect</Button>
      </header>
      <ProfilePreview profile={profile} publicView />
    </div>
  );
}
