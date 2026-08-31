import { Link } from "react-router-dom";
import { useDashboard } from "../../hooks/useDashboard.js";
import ProfileCard from "../../components/dashboard/ProfileCard.jsx";
import StatsCard from "../../components/dashboard/StatsCard.jsx";
import RecentCards from "../../components/dashboard/RecentCards.jsx";
import QuickActions from "../../components/dashboard/QuickActions.jsx";
import GrowthChart from "../../components/dashboard/GrowthChart.jsx";
import { Empty, Loading } from "../../components/common/UI.jsx";

export default function Dashboard() {
  const { data, loading, error } = useDashboard();
  if (loading) return <Loading />;
  if (error) return <Empty>{error}</Empty>;
  const metrics = data.metrics || {};
  const orgs = data.organizations || [];
  return (
    <div className="dashboard-page">
      <header>
        <div>
          <h1>Your professional workspace</h1>
          <p>
            Monitor identity, network growth and conversations from one place.
          </p>
        </div>
        <Link className="button primary" to="/profile">
          Update profile
        </Link>
      </header>
      <ProfileCard profile={data.profile} />
      <div className="metrics dashboard-metrics">
        <StatsCard label="Connections" value={metrics.connectionsCount || 0} />
        <StatsCard
          label="New requests"
          value={metrics.pendingIncomingRequests || 0}
        />
        <StatsCard
          label="Unread messages"
          value={metrics.totalUnreadMessages || 0}
        />
        <StatsCard
          label="Profile views"
          value={metrics.totalProfileViews || 0}
          helper={`${metrics.viewsLast7Days || 0} in last 7 days`}
        />
      </div>
      <GrowthChart
        metrics={{
          ...metrics,
          profileCompletion:
            metrics.profileCompletion || data.profile?.completionPercentage || 0,
        }}
      />
      <div className="dashboard-grid">
        <RecentCards card={data.digitalCard} />
        <QuickActions />
      </div>
      {orgs.length > 0 && (
        <section className="panel org-snapshot">
          <h2>Organizations</h2>
          <div className="org-chip-row">
            {orgs.map((item) => (
              <Link
                key={item.membershipId}
                to={`/organizations/${item.organization?._id || item.organization}`}
              >
                <strong>{item.organization?.name || "Organization"}</strong>
                <span>{item.role}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
