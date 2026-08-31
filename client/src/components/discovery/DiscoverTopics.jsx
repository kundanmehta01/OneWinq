import { Link } from "react-router-dom";
import {
  Palette,
  Code2,
  Megaphone,
  Rocket,
  Briefcase,
  GraduationCap,
  Camera,
  BarChart3,
} from "lucide-react";

const topics = [
  ["Designers", "design", Palette],
  ["Developers", "developer", Code2],
  ["Marketing", "marketing", Megaphone],
  ["Founders", "founder", Rocket],
  ["Business", "business", Briefcase],
  ["Students", "student", GraduationCap],
  ["Creators", "creator", Camera],
  ["Finance", "finance", BarChart3],
];

export default function DiscoverTopics() {
  return (
    <div className="discover-topics">
      {topics.map(([label, query, Icon]) => (
        <Link
          key={query}
          className="topic-tile"
          to={`/discovery/search?q=${encodeURIComponent(query)}`}
        >
          <Icon size={18} />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}
