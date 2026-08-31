import { Link } from "react-router-dom";
export default function EmptyResult({
  children = "No results found.",
  action = true,
}) {
  return (
    <div className="discovery-empty">
      <p>{children}</p>
      {action && (
        <Link className="button secondary" to="/discovery/users">
          Explore people
        </Link>
      )}
    </div>
  );
}
