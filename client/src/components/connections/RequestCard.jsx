import { Button } from "../common/UI.jsx";
export default function RequestCard({
  request,
  type = "incoming",
  onAccept,
  onReject,
  onCancel,
}) {
  const profile =
    request.requesterProfile ||
    request.recipientProfile ||
    request.requesterId?.profile ||
    request.recipientId?.profile ||
    {};
  const name =
    profile.displayName ||
    request.requesterId?.email ||
    request.recipientId?.email ||
    "Connection request";
  return (
    <article className="connection-card">
      <div className="avatar">{name[0]}</div>
      <div>
        <strong>{name}</strong>
        <span>
          {profile.designation ||
            (type === "incoming" ? "Wants to connect" : "Request pending")}
        </span>
      </div>
      <div className="connection-card-actions">
        {type === "incoming" ? (
          <>
            <Button onClick={() => onAccept(request._id)}>Accept</Button>
            <Button variant="secondary" onClick={() => onReject(request._id)}>
              Decline
            </Button>
          </>
        ) : (
          <Button variant="secondary" onClick={() => onCancel(request._id)}>
            Cancel
          </Button>
        )}
      </div>
    </article>
  );
}
