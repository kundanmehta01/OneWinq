import { Link } from "react-router-dom";
export default function RecentCards({ card }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Digital card</h2>
        <Link to="/cards">Manage</Link>
      </div>
      {card ? (
        <div className="recent-card">
          <strong>{card.theme} theme</strong>
          <span>onewinq.com/cards/{card.slug}</span>
          <Link to={`/cards/${card.slug}`}>Open public preview</Link>
        </div>
      ) : (
        <p className="empty">Your card is being provisioned.</p>
      )}
    </section>
  );
}
