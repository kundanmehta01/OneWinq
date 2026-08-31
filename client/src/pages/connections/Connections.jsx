import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Network, UserPlus, Send, Search } from "lucide-react";
import { useConnections } from "../../hooks/useConnections.js";
import { removeConnection } from "../../services/connectionService.js";
import ConnectionList from "../../components/connections/ConnectionList.jsx";
import { Loading } from "../../components/common/UI.jsx";

const profileFrom = (item) =>
  item.requesterProfile ||
  item.recipientProfile ||
  item.requesterId?.profile ||
  item.recipientId?.profile ||
  {};

export default function Connections() {
  const { connections, requests, sent, loading, refresh } = useConnections();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return connections;
    return connections.filter((connection) => {
      const profile = profileFrom(connection);
      const name = (
        profile.displayName ||
        connection.requesterId?.email ||
        connection.recipientId?.email ||
        ""
      ).toLowerCase();
      return name.includes(q);
    });
  }, [connections, query]);

  if (loading) return <Loading />;

  const remove = async (id) => {
    try {
      await removeConnection(id);
      toast.success("Connection removed");
      refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="page connections-page">
      <header>
        <div>
          <p className="eyebrow">Professional network</p>
          <h1>My connections</h1>
          <p>People you're connected with on OneWinq.</p>
        </div>
        <div className="connection-page-actions">
          <Link className="button secondary" to="/connections/requests">
            Requests{requests.length ? ` (${requests.length})` : ""}
          </Link>
          <Link className="button primary" to="/connections/find">
            Find people
          </Link>
        </div>
      </header>

      <div className="connection-stats">
        <div className="conn-stat">
          <Network size={18} />
          <strong>{connections.length}</strong>
          <span>Connections</span>
        </div>
        <div className="conn-stat">
          <UserPlus size={18} />
          <strong>{requests.length}</strong>
          <span>Incoming requests</span>
        </div>
        <div className="conn-stat">
          <Send size={18} />
          <strong>{sent.length}</strong>
          <span>Sent requests</span>
        </div>
      </div>

      {connections.length > 0 && (
        <label className="connection-search">
          <Search size={16} />
          <input
            placeholder="Search your connections…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      )}

      {connections.length === 0 ? (
        <ConnectionList connections={[]} onRemove={remove} />
      ) : filtered.length ? (
        <ConnectionList connections={filtered} onRemove={remove} />
      ) : (
        <p className="empty">No connections match "{query}".</p>
      )}

      <section className="panel grow-network">
        <div>
          <strong>Grow your network</strong>
          <span>
            The bigger your network, the more your profile and card get seen.
          </span>
        </div>
        <div className="grow-actions">
          <Link className="button secondary" to="/discover">
            Discover people
          </Link>
          <Link className="button primary" to="/connections/find">
            Find people
          </Link>
        </div>
      </section>
    </div>
  );
}
