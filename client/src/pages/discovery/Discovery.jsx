import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Users,
  CreditCard,
  Search,
  ArrowRight,
  UserPlus,
  Eye,
} from "lucide-react";
import SearchBar from "../../components/discovery/SearchBar.jsx";
import DiscoverTopics from "../../components/discovery/DiscoverTopics.jsx";
import UserResultCard from "../../components/discovery/UserResultCard.jsx";
import { useDiscovery } from "../../hooks/useDiscovery.js";
import { sendConnectionRequest } from "../../services/connectionService.js";
import { recordProfileView } from "../../services/discoveryService.js";

export default function Discovery() {
  const navigate = useNavigate();
  const { profiles, loading } = useDiscovery();
  const connect = async (id) => {
    try {
      await sendConnectionRequest(id);
      toast.success("Connection request sent");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const view = (id) => recordProfileView(id).catch(() => {});
  const preview = profiles.slice(0, 4);

  return (
    <div className="page discovery-page discover-home">
      <header className="discover-hero">
        <p className="eyebrow">Professional network</p>
        <h1>Discover your next connection</h1>
        <p>
          Search professionals, explore their expertise, and grow your network
          on OneWinq.
        </p>
      </header>

      <SearchBar
        onSearch={(q) =>
          navigate(`/discovery/search?q=${encodeURIComponent(q)}`)
        }
      />

      <section className="discover-block">
        <div className="section-heading">
          <h2>Browse by expertise</h2>
        </div>
        <DiscoverTopics />
      </section>

      <section className="discover-block">
        <div className="section-heading">
          <h2>People on OneWinq</h2>
          <Link className="heading-link" to="/discovery/users">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className="discovery-results-grid">
            {[0, 1, 2, 3].map((i) => (
              <div className="discovery-user-card skeleton" key={i} />
            ))}
          </div>
        ) : preview.length ? (
          <div className="discovery-results-grid">
            {preview.map((profile) => (
              <UserResultCard
                key={profile._id}
                profile={profile}
                onConnect={connect}
                onView={view}
              />
            ))}
          </div>
        ) : (
          <div className="discovery-empty">
            <p>
              You're among the first here. Invite colleagues or explore the
              categories above to start building your network.
            </p>
            <Link className="button primary" to="/discovery/users">
              Explore people
            </Link>
          </div>
        )}
      </section>

      <section className="discover-features">
        <Link className="feature-card" to="/discovery/users">
          <Users size={20} />
          <div>
            <strong>Explore people</strong>
            <span>Browse professionals and send connection requests.</span>
          </div>
          <ArrowRight size={16} />
        </Link>
        <Link className="feature-card" to="/discovery/cards">
          <CreditCard size={20} />
          <div>
            <strong>Explore cards</strong>
            <span>See the digital business cards the community shares.</span>
          </div>
          <ArrowRight size={16} />
        </Link>
      </section>

      <section className="discover-block discover-steps">
        <div className="section-heading">
          <h2>How discovery works</h2>
        </div>
        <div className="discover-steps-grid">
          <div>
            <Search size={18} />
            <strong>1 · Search or browse</strong>
            <span>Find people by skill, role, or category.</span>
          </div>
          <div>
            <Eye size={18} />
            <strong>2 · View profiles</strong>
            <span>Open full profiles and digital cards.</span>
          </div>
          <div>
            <UserPlus size={18} />
            <strong>3 · Connect</strong>
            <span>Send a request, then message once accepted.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
