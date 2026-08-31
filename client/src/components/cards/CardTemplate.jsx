import ProfileSection from "./ProfileSection.jsx";
import SocialLinks from "./SocialLinks.jsx";
import { CardQrMark } from "./ShareCodes.jsx";
export default function CardTemplate({ card, preview = false }) {
  const profile = card?.profileId || card?.profile || {};
  const layout = card?.layout || {};
  const color = layout.customColor || "#6366f1";
  return (
    <article
      className={`digital-card theme-${(card?.theme || "MODERN").toLowerCase()}`}
      style={{ "--card-color": color }}
    >
      <div className="card-brand">
        one<span>winq</span>
      </div>
      <ProfileSection profile={profile} layout={layout} />
      {layout.showServices && profile.services?.length > 0 && (
        <div className="card-services">
          {profile.services.map((service) => (
            <span key={service._id || service.name}>{service.name}</span>
          ))}
        </div>
      )}
      <SocialLinks
        links={profile.socialLinks}
        enabled={layout.showSocialLinks}
      />
      {layout.showQRCode && <CardQrMark slug={card?.slug} compact />}
      <small className="card-slug">onewinq.com/cards/{card?.slug}</small>
    </article>
  );
}
