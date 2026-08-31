import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicCard } from "../../services/cardService.js";
import CardTemplate from "../../components/cards/CardTemplate.jsx";
import { Empty, Loading } from "../../components/common/UI.jsx";
import { resolveProfileName } from "../../utils/name.js";
export default function CardPreview() {
  const { slug } = useParams();
  const [card, setCard] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    getPublicCard(slug)
      .then((result) => setCard(result.data))
      .catch((e) => setError(e.message));
  }, [slug]);
  if (error)
    return (
      <div className="public-card-page">
        <Empty>{error}</Empty>
      </div>
    );
  if (!card) return <Loading />;
  const fallbackName = resolveProfileName(
    card?.profileId || card?.profile || {},
    null
  );
  return (
    <div className="public-card-page">
      <CardTemplate card={card} fallbackName={fallbackName} />
    </div>
  );
}
