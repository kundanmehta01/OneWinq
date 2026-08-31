import RequestCard from "./RequestCard.jsx";
import EmptyConnections from "./EmptyConnections.jsx";
export default function PendingRequests({
  requests,
  type,
  onAccept,
  onReject,
  onCancel,
}) {
  if (!requests.length)
    return (
      <EmptyConnections>
        {type === "incoming"
          ? "No incoming requests."
          : "No connection requests are pending."}
      </EmptyConnections>
    );
  return (
    <div className="connection-list">
      {requests.map((request) => (
        <RequestCard
          key={request._id}
          request={request}
          type={type}
          onAccept={onAccept}
          onReject={onReject}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}
