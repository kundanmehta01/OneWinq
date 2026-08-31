import { Link } from "react-router-dom";
import { Bell, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar() {
  const { user } = useAuth();
  const label = user?.email || user?.phone || "You";
  return (
    <header className="dashboard-navbar">
      <div>
        <p className="eyebrow">Dashboard</p>
        <strong>{label}</strong>
      </div>
      <div>
        <Link className="icon-button" to="/messages" aria-label="Messages">
          <Bell size={18} />
        </Link>
        <div className="navbar-user" title={label}>
          {label[0]?.toUpperCase()}
        </div>
        <Link className="button primary" to="/cards/create">
          <Plus size={16} />
          Card
        </Link>
      </div>
    </header>
  );
}
