import { Link } from "react-router-dom";
import { Users } from "lucide-react";

export default function EmptyConnections({ children }) {
  return (
    <div className="empty-connections rich">
      <div className="empty-icon">
        <Users size={26} />
      </div>
      <h2>No connections yet</h2>
      <p>
        {children ||
          "Your professional network is ready to grow. Find people you know and start connecting."}
      </p>
      <div className="empty-actions">
        <Link className="button primary" to="/connections/find">
          Find people
        </Link>
        <Link className="button secondary" to="/discover">
          Discover
        </Link>
      </div>
    </div>
  );
}
