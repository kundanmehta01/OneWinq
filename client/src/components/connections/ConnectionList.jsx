import ConnectionCard from "./ConnectionCard.jsx";
import EmptyConnections from "./EmptyConnections.jsx";
export default function ConnectionList({ connections, onRemove }) {
  if (!connections.length) return <EmptyConnections />;
  return (
    <div className="connection-list">
      {connections.map((connection) => (
        <ConnectionCard
          key={connection._id}
          connection={connection}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
