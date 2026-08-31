import { useState } from "react";
import toast from "react-hot-toast";
import { useConnections } from "../../hooks/useConnections.js";
import {
  acceptConnectionRequest,
  rejectConnectionRequest,
  removeConnection,
} from "../../services/connectionService.js";
import PendingRequests from "../../components/connections/PendingRequests.jsx";
import { Loading } from "../../components/common/UI.jsx";
export default function ConnectionRequests() {
  const { requests, sent, loading, refresh } = useConnections();
  const [tab, setTab] = useState("incoming");
  if (loading) return <Loading />;
  const action = async (fn, id, message) => {
    try {
      await fn(id);
      toast.success(message);
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
          <h1>Connection requests</h1>
        </div>
      </header>
      <div className="tabs">
        <button
          className={tab === "incoming" ? "active" : ""}
          onClick={() => setTab("incoming")}
        >
          Incoming ({requests.length})
        </button>
        <button
          className={tab === "sent" ? "active" : ""}
          onClick={() => setTab("sent")}
        >
          Sent ({sent.length})
        </button>
      </div>
      <PendingRequests
        requests={tab === "incoming" ? requests : sent}
        type={tab}
        onAccept={(id) =>
          action(acceptConnectionRequest, id, "Connection accepted")
        }
        onReject={(id) =>
          action(rejectConnectionRequest, id, "Request declined")
        }
        onCancel={(id) => action(removeConnection, id, "Request cancelled")}
      />
    </div>
  );
}
