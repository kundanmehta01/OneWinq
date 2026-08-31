export default function SocialLinks({ links = [] }) {
  if (!links.length) return null;
  return (
    <div className="profile-social-links">
      {links.map((link) => (
        <a
          href={link.url}
          key={link._id || link.url}
          target="_blank"
          rel="noreferrer"
        >
          {link.platform}
        </a>
      ))}
    </div>
  );
}
