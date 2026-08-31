import { Link } from "react-router-dom";
import CardTemplate from "./CardTemplate.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { resolveProfileName } from "../../utils/name.js";

export default function CardItem({ card }) {
  const { user } = useAuth();
  const profile = card?.profileId || card?.profile || {};
  const fallbackName = resolveProfileName(profile, user);
  return (
    <article className="card-item">
      <CardTemplate card={card} fallbackName={fallbackName} />
      <div className="card-item-actions">
        <Link className="button secondary" to={`/cards/${card.slug}`}>
          Preview
        </Link>
        <Link className="button primary" to="/cards/edit">
          Customize
        </Link>
      </div>
    </article>
  );
}
