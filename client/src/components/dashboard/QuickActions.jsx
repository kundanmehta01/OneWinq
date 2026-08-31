import { Link } from "react-router-dom";
import { Compass, MessageCircle, Network, UserRound } from "lucide-react";
const actions = [
  ["/profile", UserRound, "Complete profile"],
  ["/discover", Compass, "Discover people"],
  ["/connections", Network, "View requests"],
  ["/messages", MessageCircle, "Open messages"],
];
export default function QuickActions() {
  return (
    <section className="panel">
      <h2>Quick actions</h2>
      <div className="quick-actions">
        {actions.map(([to, Icon, label]) => (
          <Link to={to} key={to}>
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
