import { useState } from "react";
import { Search } from "lucide-react";
import { Button, Input } from "../common/UI.jsx";
export default function SearchBar({ onSearch, initialValue = "" }) {
  const [query, setQuery] = useState(initialValue);
  return (
    <form
      className="discovery-search"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(query);
      }}
    >
      <Input
        placeholder="Search people, skills, roles…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Button>
        <Search size={16} />
        Search
      </Button>
    </form>
  );
}
