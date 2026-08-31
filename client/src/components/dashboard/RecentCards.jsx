import { Link } from "react-router-dom";
import { Code39 } from "../cards/ShareCodes.jsx";

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
          <div className="recent-card-code">
            <Code39 value={card.slug} className="code39 tiny" />
            <p>Barcode ready — scan to open your card</p>
          </div>
          <div className="recent-card-links">
            <Link to={`/cards/${card.slug}`}>Open public preview</Link>
            <Link to="/cards">Share codes & barcode</Link>
          </div>
        </div>
      ) : (
        <p className="empty">Your card is being provisioned.</p>
      )}
    </section>
  );
}
