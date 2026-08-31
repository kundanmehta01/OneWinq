import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useConnections } from "../../hooks/useConnections.js";
import { removeConnection } from "../../services/connectionService.js";
import ConnectionList from "../../components/connections/ConnectionList.jsx";
import { Loading } from "../../components/common/UI.jsx";
export default function Connections() {
  const { connections, loading, refresh } = useConnections();
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
        </div>
        <div className="connection-page-actions">
          <Link className="button secondary" to="/connections/requests">
            Requests
          </Link>
          <Link className="button primary" to="/connections/find">
            Find people
          </Link>
        </div>
      </header>
      <ConnectionList connections={connections} onRemove={remove} />
    </div>
  );
}
