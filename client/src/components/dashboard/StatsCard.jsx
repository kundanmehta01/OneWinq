export default function StatsCard({ label, value, helper, Icon, tone = "indigo" }) {
  return (
    <article className={`metric icon-stat tone-${tone}`}>
      {Icon && (
        <span className="stat-icon">
          <Icon size={18} />
        </span>
      )}
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        {helper && <small>{helper}</small>}
      </div>
    </article>
  );
}
