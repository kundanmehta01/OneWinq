import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useDashboard } from "../../hooks/useDashboard.js";
import { Loading, Empty } from "../../components/common/UI.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { resolveProfileName } from "../../utils/name.js";

function filled(value) {
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value && String(value).trim());
}

export default function ProfileDashboard() {
  const { data, loading, error } = useDashboard();
  const { user } = useAuth();
  if (loading) return <Loading />;
  if (error) return <Empty>{error}</Empty>;
  const profile = data.profile || {};
  const metrics = data.metrics || {};
  const name = resolveProfileName(profile, user);
  const completion = profile.completionPercentage || 0;
  const checks = [
    ["Full name", filled(profile.displayName) || filled(profile.firstName)],
    ["Headline", filled(profile.designation)],
    ["Introduction", filled(profile.introduction)],
    ["About", filled(profile.about)],
    ["Photo", filled(profile.profilePhoto?.url)],
    ["Contact", filled(profile.contact?.email) || filled(profile.contact?.phone)],
    ["Skills", filled(profile.skills)],
    ["Experience", filled(profile.experience)],
    ["Education", filled(profile.education)],
    ["Social links", filled(profile.socialLinks)],
  ];
  const done = checks.filter((item) => item[1]).length;
  const missing = checks.filter((item) => !item[1]).map((item) => item[0]);

  return (
    <div className="dashboard-page profile-dash">
      <header>
        <div>
          <h1>Profile dashboard</h1>
          <p>See how complete and visible your public identity is.</p>
        </div>
        <div className="profile-dash-actions">
          {profile.slug && (
            <Link className="button secondary" to={`/profiles/${profile.slug}`}>
              View public profile
            </Link>
          )}
          <Link className="button primary" to="/profile/edit">
            Edit profile
          </Link>
        </div>
      </header>
      <section className="profile-dash-hero panel">
        {profile.profilePhoto?.url ? (
          <img
            className="avatar large photo"
            src={profile.profilePhoto.url}
            alt={name}
          />
        ) : (
          <div className="avatar large">{name[0]}</div>
        )}
        <div>
          <h2>{name}</h2>
          <p>{profile.designation || "Add a professional headline"}</p>
          <small>
            {profile.visibility || "PUBLIC"} · {profile.template || "DEFAULT"}{" "}
            template · /{profile.slug || "your-slug"}
          </small>
        </div>
        <div className="completion-ring" style={{ "--pct": `${completion}` }}>
          <strong>{completion}%</strong>
          <span>complete</span>
        </div>
      </section>
      {missing.length > 0 && (
        <section className="panel tips-panel">
          <div className="section-heading">
            <h2>
              <Sparkles size={16} /> Grow your profile
            </h2>
            <span className="badge">{missing.length} to go</span>
          </div>
          <p>
            Profiles with a photo, headline and skills get far more views and
            connection requests. Finish these next:
          </p>
          <div className="tips-chips">
            {missing.slice(0, 4).map((label) => (
              <Link key={label} to="/profile/edit">
                + {label}
              </Link>
            ))}
          </div>
        </section>
      )}
      <div className="dashboard-grid">
        <section className="panel">
          <div className="section-heading">
            <h2>Identity checklist</h2>
            <span className="badge">
              {done}/{checks.length} done
            </span>
          </div>
          <ul className="identity-checks">
            {checks.map(([label, ok]) => (
              <li key={label} className={ok ? "done" : ""}>
                <i />
                {label}
              </li>
            ))}
          </ul>
        </section>
        <section className="panel detail-list">
          <h2>Live snapshot</h2>
          <div>
            <span>Profile views</span>
            <strong>{metrics.totalProfileViews || 0}</strong>
          </div>
          <div>
            <span>Views last 7 days</span>
            <strong>{metrics.viewsLast7Days || 0}</strong>
          </div>
          <div>
            <span>Connections</span>
            <strong>{metrics.connectionsCount || 0}</strong>
          </div>
          <div>
            <span>Published thoughts</span>
            <strong>{metrics.publishedThoughtsCount || 0}</strong>
          </div>
          <div>
            <span>Public slug</span>
            <strong>{profile.slug || "Not ready"}</strong>
          </div>
          <div>
            <span>Digital card</span>
            <strong>{data.digitalCard?.theme || "Provisioning"}</strong>
          </div>
        </section>
      </div>
      {profile.skills?.length > 0 && (
        <section className="panel">
          <h2>Skills on your profile</h2>
          <div className="skill-list">
            {profile.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
