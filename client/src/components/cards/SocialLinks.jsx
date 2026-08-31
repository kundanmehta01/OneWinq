export default function SocialLinks({ links = [], enabled }) {
  if (!enabled || !links.length) return null;
  return (
    <div className="card-social-links">
      {links.map((link) => (
        <a
          href={link.url}
          target="_blank"
          rel="noreferrer"
          key={link._id || link.url}
        >
          {link.platform}
        </a>
      ))}
    </div>
  );
}
