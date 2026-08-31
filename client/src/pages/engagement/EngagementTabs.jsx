import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/engagement", label: "Feed", end: true },
  { to: "/engagement/analytics", label: "Analytics" },
  { to: "/engagement/activity", label: "Activity" },
  { to: "/engagement/visitors", label: "Visitors" },
];

export default function EngagementTabs() {
  return (
    <nav className="engagement-tabs">
      {tabs.map((tab) => (
        <NavLink key={tab.to} to={tab.to} end={tab.end}>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
