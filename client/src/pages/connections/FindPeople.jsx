import { useState } from "react";
import toast from "react-hot-toast";
import {
  findPeople,
  sendConnectionRequest,
} from "../../services/connectionService.js";
import UserSearchCard from "../../components/connections/UserSearchCard.jsx";
import { Button, Empty, Input } from "../../components/common/UI.jsx";
export default function FindPeople() {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState([]);
  const [searched, setSearched] = useState(false);
  const search = async (event) => {
    event.preventDefault();
    try {
      const response = await findPeople(query ? { q: query } : {});
      setPeople(response.data.items);
      setSearched(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const connect = async (id) => {
    try {
      await sendConnectionRequest(id);
      toast.success("Connection request sent");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="page connections-page">
      <header>
        <div>
          <p className="eyebrow">Professional network</p>
          <h1>Find people</h1>
        </div>
      </header>
      <form className="search" onSubmit={search}>
        <Input
          placeholder="Search name, role or skills"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button>Search</Button>
      </form>
      {searched &&
        (people.length ? (
          <div className="people-grid">
            {people.map((profile) => (
              <UserSearchCard
                key={profile._id}
                profile={profile}
                onConnect={connect}
              />
            ))}
          </div>
        ) : (
          <Empty>No people match your search.</Empty>
        ))}
    </div>
  );
}
