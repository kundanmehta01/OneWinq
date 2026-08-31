export default function AnalyticsCard({ label, value, hint, accent }) {
  return (
    <article className={`metric analytics-card${accent ? ` ${accent}` : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {hint && <small>{hint}</small>}
    </article>
  );
}
