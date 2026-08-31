import { Link } from "react-router-dom";
import { useDashboard } from "../../hooks/useDashboard.js";
import { Loading, Empty } from "../../components/common/UI.jsx";
export default function ProfileDashboard() {
  const { data, loading, error } = useDashboard();
  if (loading) return <Loading />;
  if (error) return <Empty>{error}</Empty>;
  const profile = data.profile || {};
  const sections = [
    ["Professional identity", profile.displayName || "Not added"],
    ["Headline", profile.designation || "Not added"],
    ["Introduction", profile.introduction || "Not added"],
    [
      "Skills",
      profile.skills?.length ? profile.skills.join(", ") : "Not added",
    ],
    ["Experience", `${profile.experience?.length || 0} entries`],
    ["Education", `${profile.education?.length || 0} entries`],
  ];
  return (
    <div className="dashboard-page">
      <header>
        <div>
          <h1>Profile dashboard</h1>
          <p>See what makes your public professional identity complete.</p>
        </div>
        <Link className="button primary" to="/profile">
          Edit profile
        </Link>
      </header>
      <section className="panel profile-progress">
        <strong>{profile.completionPercentage || 0}%</strong>
        <div>
          <b>Profile completion</b>
          <span>
            <i style={{ width: `${profile.completionPercentage || 0}%` }} />
          </span>
        </div>
      </section>
      <section className="panel detail-list">
        {sections.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>
    </div>
  );
}
