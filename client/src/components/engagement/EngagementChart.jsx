import { Empty } from "../common/UI.jsx";

const truncate = (text = "", length = 64) =>
  text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;

// Pure-CSS engagement chart (no chart library in the client): one stacked bar
// per thought, likes vs comments, scaled against the highest total.
export default function EngagementChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="panel">
        <Empty>
          Publish a thought to start seeing engagement trends here.
        </Empty>
      </div>
    );
  }
  const max = Math.max(...data.map((d) => d.likes + d.comments), 1);
  return (
    <div className="panel engagement-chart">
      <h2>Top thoughts by engagement</h2>
      <div className="chart">
        {data.map((item) => (
          <div className="chart-row" key={item.id}>
            <p title={item.label}>{truncate(item.label)}</p>
            <div className="chart-bar" role="img" aria-label={`${item.likes} likes, ${item.comments} comments`}>
              <i className="likes" style={{ width: `${(item.likes / max) * 100}%` }} />
              <i className="comments" style={{ width: `${(item.comments / max) * 100}%` }} />
            </div>
            <span>{item.likes + item.comments}</span>
          </div>
        ))}
      </div>
      <div className="chart-legend">
        <span>
          <i className="likes" /> Likes
        </span>
        <span>
          <i className="comments" /> Comments
        </span>
      </div>
    </div>
  );
}
