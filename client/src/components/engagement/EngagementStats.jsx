export default function EngagementStats({ stats }) {
  if (!stats) return null;
  const items = [
    { label: "Thoughts published", value: stats.thoughtsPublished },
    { label: "Profile views", value: stats.profileViews },
    { label: "Views last 7 days", value: stats.viewsLast7Days },
    { label: "Likes received", value: stats.likesReceived },
    { label: "Comments received", value: stats.commentsReceived },
  ];
  return (
    <div className="metrics engagement-stats">
      {items.map((item) => (
        <article className="metric" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </article>
      ))}
    </div>
  );
}
