import { Link } from "react-router-dom";
import { timeAgo } from "../../hooks/useEngagement.js";

const initialsOf = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

function ThoughtActivity({ thought }) {
  const author = thought.profileId || {};
  return (
    <article className="activity-card panel">
      <div className="activity-card-head">
        <div className="avatar">{initialsOf(author.displayName)}</div>
        <div>
          <strong>{author.displayName || "You"}</strong>
          <span>Published a thought · {timeAgo(thought.createdAt)}</span>
        </div>
        <span className="badge">Thought</span>
      </div>
      <p>{thought.content}</p>
      <footer>
        <span>
          {thought.likeCount || 0} likes · {thought.commentCount || 0} comments
        </span>
        {author.slug && (
          <Link to={`/profiles/${author.slug}`}>View profile</Link>
        )}
      </footer>
    </article>
  );
}

function ViewActivity({ profile, date }) {
  return (
    <article className="activity-card panel">
      <div className="activity-card-head">
        <div className="avatar">{initialsOf(profile.displayName)}</div>
        <div>
          <strong>{profile.displayName || "Unknown profile"}</strong>
          <span>
            You viewed this profile · {timeAgo(date)}
          </span>
        </div>
        <span className="badge">View</span>
      </div>
      {profile.designation && <p>{profile.designation}</p>}
      <footer>
        {profile.slug && <Link to={`/profiles/${profile.slug}`}>Open profile</Link>}
      </footer>
    </article>
  );
}

export default function ActivityCard({ activity }) {
  if (!activity) return null;
  if (activity.kind === "view") {
    return <ViewActivity profile={activity.profile} date={activity.date} />;
  }
  return <ThoughtActivity thought={activity.thought} />;
}
