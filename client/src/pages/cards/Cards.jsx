import { Link } from "react-router-dom";
import { useCards } from "../../hooks/useCards.js";
import CardItem from "../../components/cards/CardItem.jsx";
import { Empty, Loading } from "../../components/common/UI.jsx";
export default function Cards() {
  const { card, loading } = useCards();
  if (loading) return <Loading />;
  return (
    <div className="page">
      <header>
        <div>
          <p className="eyebrow">Shareable identity</p>
          <h1>My digital card</h1>
        </div>
        <Link className="button primary" to="/cards/create">
          Set up card
        </Link>
      </header>
      {card ? (
        <CardItem card={card} />
      ) : (
        <Empty>Your card will appear here after profile provisioning.</Empty>
      )}
    </div>
  );
}
