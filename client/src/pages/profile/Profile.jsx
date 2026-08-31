import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile.js";
import ProfilePreview from "../../components/profile/ProfilePreview.jsx";
import ShareCodes from "../../components/cards/ShareCodes.jsx";
import { Empty, Loading } from "../../components/common/UI.jsx";
import { cardService } from "../../services/modules.js";

export default function Profile() {
  const { profile, loading, error } = useProfile();
  const [card, setCard] = useState(null);

  useEffect(() => {
    cardService
      .mine()
      .then((result) => setCard(result.data))
      .catch(() => setCard(null));
  }, []);

  const enableCodes = async (payload) => {
    const result = await cardService.update(payload);
    setCard(result.data);
    return result.data;
  };

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
      <ShareCodes
        card={card}
        onEnable={enableCodes}
      />
    </div>
  );
}
