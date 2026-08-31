import { Input } from "../common/UI.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
export default function FilterPanel({ filters, onChange }) {
  const update = (key, value) => onChange({ ...filters, [key]: value });
  return (
    <aside className="filter-panel">
      <h2>Filters</h2>
      <Input
        label="Skills"
        placeholder="React, Node.js"
        value={filters.skills || ""}
        onChange={(event) => update("skills", event.target.value)}
      />
      <Input
        label="Designation"
        placeholder="Designer"
        value={filters.designation || ""}
        onChange={(event) => update("designation", event.target.value)}
      />
      <Input
        label="Location"
        placeholder="Mumbai"
        value={filters.location || ""}
        onChange={(event) => update("location", event.target.value)}
      />
      <label>Profile type</label>
      <CategoryFilter
        value={filters.profileType || ""}
        onChange={(value) => update("profileType", value)}
      />
    </aside>
  );
}
