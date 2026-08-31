import { Link } from "react-router-dom";

export default function EmptyActivity() {
  return (
    <div className="panel empty-activity">
      <h2>No activity yet</h2>
      <p>
        When you publish thoughts or view profiles, your recent activity will
        show up here.
      </p>
      <Link className="button primary" to="/engagement">
        Share your first thought
      </Link>
    </div>
  );
}
