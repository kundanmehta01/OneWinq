import CardResultCard from "../../components/discovery/CardResultCard.jsx";
import EmptyResult from "../../components/discovery/EmptyResult.jsx";
export default function ExploreCards() {
  return (
    <div className="page discovery-page">
      <header>
        <div>
          <p className="eyebrow">Digital identity</p>
          <h1>Explore public cards</h1>
        </div>
      </header>
      <div className="card-discovery-notice">
        <CardResultCard />
        <EmptyResult action={false}>
          The current backend does not expose a public card-listing endpoint.
          Open a card using its shared OneWinq link.
        </EmptyResult>
      </div>
    </div>
  );
}
