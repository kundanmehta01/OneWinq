import { Link } from "react-router-dom";
import { Eye, MessageCircle, Network, UserPlus } from "lucide-react";
import { useDashboard } from "../../hooks/useDashboard.js";
import { useAuth } from "../../context/AuthContext.jsx";
import ProfileCard from "../../components/dashboard/ProfileCard.jsx";
import StatsCard from "../../components/dashboard/StatsCard.jsx";
import RecentCards from "../../components/dashboard/RecentCards.jsx";
import QuickActions from "../../components/dashboard/QuickActions.jsx";
import GrowthChart from "../../components/dashboard/GrowthChart.jsx";
import { Empty, Loading } from "../../components/common/UI.jsx";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const { data, loading, error } = useDashboard();
  const { user } = useAuth();
  if (loading) return <Loading />;
  if (error) return <Empty>{error}</Empty>;
  const metrics = data.metrics || {};
  const orgs = data.organizations || [];
  const firstName =
    data.profile?.displayName?.split(" ")[0] ||
    data.profile?.firstName ||
    (user?.email || user?.phone || "").split("@")[0] ||
    "there";

  return (
    <div className="dashboard-page">
      <header>
        <div>
          <p className="eyebrow">{new Date().toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" })}</p>
          <h1>
            {greeting()}, {firstName}
          </h1>
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
        <StatsCard
          label="Connections"
          value={metrics.connectionsCount || 0}
          helper="Accepted network"
          Icon={Network}
          tone="indigo"
        />
        <StatsCard
          label="New requests"
          value={metrics.pendingIncomingRequests || 0}
          helper="Waiting for you"
          Icon={UserPlus}
          tone="amber"
        />
        <StatsCard
          label="Unread messages"
          value={metrics.totalUnreadMessages || 0}
          helper="Across all chats"
          Icon={MessageCircle}
          tone="teal"
        />
        <StatsCard
          label="Profile views"
          value={metrics.totalProfileViews || 0}
          helper={`${metrics.viewsLast7Days || 0} in last 7 days`}
          Icon={Eye}
          tone="violet"
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
