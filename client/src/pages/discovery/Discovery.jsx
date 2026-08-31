import { Link } from "react-router-dom";
import SearchBar from "../../components/discovery/SearchBar.jsx";
export default function Discovery() {
  return (
    <div className="page discovery-page">
      <header>
        <div>
          <p className="eyebrow">Professional network</p>
          <h1>Discover your next connection</h1>
          <p>
            Search professionals, filter their expertise, and grow your network.
          </p>
        </div>
      </header>
      <SearchBar
        onSearch={(q) => {
          window.location.assign(
            `/discovery/search?q=${encodeURIComponent(q)}`,
          );
        }}
      />
      <div className="discovery-home-actions">
        <Link className="button primary" to="/discovery/users">
          Explore people
        </Link>
        <Link className="button secondary" to="/discovery/cards">
          Explore cards
        </Link>
      </div>
    </div>
  );
}
