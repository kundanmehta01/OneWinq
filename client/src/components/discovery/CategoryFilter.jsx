const categories = [
  ["", "All"],
  ["PROFESSIONAL", "Professionals"],
  ["PERSONAL", "Personal"],
];
export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="category-filter">
      {categories.map(([key, label]) => (
        <button
          className={value === key ? "active" : ""}
          key={label}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
