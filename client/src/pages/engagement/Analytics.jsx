import { useEngagementAnalytics } from "../../hooks/useEngagement.js";
import AnalyticsCard from "../../components/engagement/AnalyticsCard.jsx";
import EngagementChart from "../../components/engagement/EngagementChart.jsx";
import { Empty, Loading } from "../../components/common/UI.jsx";
import EngagementTabs from "./EngagementTabs.jsx";

export default function Analytics() {
  const { summary, loading, error } = useEngagementAnalytics();

  if (loading) return <Loading />;

  const chartData = (summary.topThoughts || []).map((thought) => ({
    id: thought._id,
    label: thought.content,
    likes: thought.likeCount || 0,
    comments: thought.commentCount || 0,
  }));

  return (
    <div className="page engagement-page">
      <header>
        <div>
          <p className="eyebrow">Professional engagement</p>
          <h1>Engagement analytics</h1>
        </div>
        <EngagementTabs />
      </header>
      {error ? (
        <Empty>{error}</Empty>
      ) : (
        <>
          <div className="metrics analytics-metrics">
            <AnalyticsCard
              label="Profile views"
              value={summary.totalViews}
              hint="All-time profile reach"
            />
            <AnalyticsCard
              label="Views last 7 days"
              value={summary.viewsLast7Days}
              hint="Recent profile traffic"
              accent="highlight"
            />
            <AnalyticsCard
              label="Thoughts in feed"
              value={summary.thoughtsPublished}
              hint="Published and visible"
            />
            <AnalyticsCard
              label="Likes received"
              value={summary.likesReceived}
              hint="Across your thoughts"
            />
            <AnalyticsCard
              label="Comments received"
              value={summary.commentsReceived}
              hint="Across your thoughts"
            />
          </div>
          <EngagementChart data={chartData} />
        </>
      )}
    </div>
  );
}
