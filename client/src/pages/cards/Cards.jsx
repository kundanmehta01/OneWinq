import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCards } from "../../hooks/useCards.js";
import CardItem from "../../components/cards/CardItem.jsx";
import ShareCodes from "../../components/cards/ShareCodes.jsx";
import { Empty, Loading } from "../../components/common/UI.jsx";

export default function Cards() {
  const { card, loading, saveCard } = useCards();
  if (loading) return <Loading />;

  const enableCodes = async (payload) => {
    try {
      return await saveCard(payload);
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  return (
    <div className="page">
      <header>
        <div>
          <p className="eyebrow">Shareable identity</p>
          <h1>My digital card</h1>
        </div>
        <Link className="button primary" to={card ? "/cards/edit" : "/cards/create"}>
          {card ? "Customize" : "Set up card"}
        </Link>
      </header>
      {card ? (
        <>
          <CardItem card={card} />
          <ShareCodes card={card} onEnable={enableCodes} />
        </>
      ) : (
        <Empty>Your card will appear here after profile provisioning.</Empty>
      )}
    </div>
  );
}
