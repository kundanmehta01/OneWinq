import { Link } from "react-router-dom";
export default function EmptyConnections({
  children = "Your professional network is ready to grow.",
}) {
  return (
    <div className="empty-connections">
      <p>{children}</p>
      <Link className="button primary" to="/connections/find">
        Find people
      </Link>
    </div>
  );
}
