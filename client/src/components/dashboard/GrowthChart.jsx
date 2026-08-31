import { TrendingDown, TrendingUp } from "lucide-react";

function growthBadge(last7, earlier) {
  if (earlier <= 0 && last7 > 0) {
    return { text: "New activity this week", up: true };
  }
  if (earlier <= 0) return { text: "No views yet", up: false };
  const pct = Math.round(((last7 - earlier) / earlier) * 100);
  if (pct >= 0) return { text: `+${pct}% vs earlier`, up: true };
  return { text: `${pct}% vs earlier`, up: false };
}

export default function GrowthChart({ metrics = {} }) {
  const last7 = metrics.viewsLast7Days || 0;
  const total = metrics.totalProfileViews || 0;
  const earlier = Math.max(total - last7, 0);
  const connections = metrics.connectionsCount || 0;
  const requests = metrics.pendingIncomingRequests || 0;
  const unread = metrics.totalUnreadMessages || 0;
  const thoughts = metrics.publishedThoughtsCount || 0;
  const completion = metrics.profileCompletion || 0;
  const viewMax = Math.max(last7, earlier, 1);
  const badge = growthBadge(last7, earlier);
  const TrendIcon = badge.up ? TrendingUp : TrendingDown;
  const mix = [
    ["Profile complete", completion, "%"],
    ["Connections", connections, ""],
    ["Open requests", requests, ""],
    ["Unread chats", unread, ""],
    ["Published thoughts", thoughts, ""],
  ];
  const mixMax = Math.max(...mix.map((item) => Number(item[1]) || 0), 1);

  return (
    <section className="panel growth-panel">
      <div className="section-heading">
        <h2>Growth overview</h2>
        <div className="growth-heading-meta">
          <span className={`badge ${badge.up ? "up" : "down"}`}>
            <TrendIcon size={13} />
            {badge.text}
          </span>
          <span className="badge neutral">{last7} views this week</span>
        </div>
      </div>
      <div className="growth-grid">
        <div>
          <p className="growth-label">Profile views</p>
          <div
            className="growth-bars"
            role="img"
            aria-label="Views this week versus earlier"
          >
            <div>
              <span>Last 7 days</span>
              <i style={{ height: `${Math.max((last7 / viewMax) * 100, 8)}%` }} />
              <strong>{last7}</strong>
            </div>
            <div>
              <span>Earlier</span>
              <i
                className="earlier"
                style={{ height: `${Math.max((earlier / viewMax) * 100, 8)}%` }}
              />
              <strong>{earlier}</strong>
            </div>
          </div>
        </div>
        <div className="growth-mix">
          {mix.map(([label, value, suffix]) => (
            <div key={label}>
              <div>
                <span>{label}</span>
                <strong>
                  {value}
                  {suffix}
                </strong>
              </div>
              <b>
                <i
                  style={{
                    width: `${Math.max((Number(value) / mixMax) * 100, 4)}%`,
                  }}
                />
              </b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
