import { useEngagementVisitors } from "../../hooks/useEngagement.js";
import VisitorCard from "../../components/engagement/VisitorCard.jsx";
import { Empty, Loading } from "../../components/common/UI.jsx";
import EngagementTabs from "./EngagementTabs.jsx";

export default function Visitors() {
  const { analytics, visitors, loading, error } = useEngagementVisitors();

  if (loading) return <Loading />;

  return (
    <div className="page engagement-page">
      <header>
        <div>
          <p className="eyebrow">Professional engagement</p>
          <h1>Profile visitors</h1>
        </div>
        <EngagementTabs />
      </header>
      {error ? (
        <Empty>{error}</Empty>
      ) : (
        <>
          <div className="metrics">
            <article className="metric">
              <span>Total profile views</span>
              <strong>{analytics?.totalViews ?? 0}</strong>
            </article>
            <article className="metric">
              <span>Views last 7 days</span>
              <strong>{analytics?.viewsLast7Days ?? 0}</strong>
            </article>
          </div>
          <h2>Recent visitors</h2>
          {visitors.length ? (
            <div className="visitor-grid">
              {visitors.map((view) => (
                <VisitorCard key={view._id} view={view} />
              ))}
            </div>
          ) : (
            <div className="panel">
              <Empty>
                No profile visits recorded yet. Share your digital card to get
                discovered.
              </Empty>
            </div>
          )}
        </>
      )}
    </div>
  );
}
