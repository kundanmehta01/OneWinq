import { useEngagementActivity } from "../../hooks/useEngagement.js";
import ActivityCard from "../../components/engagement/ActivityCard.jsx";
import EmptyActivity from "../../components/engagement/EmptyActivity.jsx";
import { Empty, Loading } from "../../components/common/UI.jsx";
import EngagementTabs from "./EngagementTabs.jsx";

export default function Activity() {
  const { activities, loading, error } = useEngagementActivity();

  if (loading) return <Loading />;

  return (
    <div className="page engagement-page">
      <header>
        <div>
          <p className="eyebrow">Professional engagement</p>
          <h1>Your activity</h1>
        </div>
        <EngagementTabs />
      </header>
      {error ? (
        <Empty>{error}</Empty>
      ) : activities.length ? (
        <div className="activity-list">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <EmptyActivity />
      )}
    </div>
  );
}
