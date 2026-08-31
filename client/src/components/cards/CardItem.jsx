import { Link } from "react-router-dom";
import CardTemplate from "./CardTemplate.jsx";
export default function CardItem({ card }) {
  return (
    <article className="card-item">
      <CardTemplate card={card} />
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
