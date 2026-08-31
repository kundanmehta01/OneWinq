import { NavLink } from "react-router-dom";
import { ChartNoAxesCombined, Settings, UserRound } from "lucide-react";
const links = [
  ["/dashboard", ChartNoAxesCombined, "Overview", true],
  ["/dashboard/profile", UserRound, "Profile dashboard"],
  ["/dashboard/settings", Settings, "Settings"],
];
export default function Sidebar() {
  return (
    <nav className="dashboard-sidebar">
      {links.map(([to, Icon, text, end]) => (
        <NavLink end={end} to={to} key={to}>
          <Icon size={17} />
          {text}
        </NavLink>
      ))}
    </nav>
  );
}
