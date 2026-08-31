import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDiscovery } from "../../hooks/useDiscovery.js";
import { sendConnectionRequest } from "../../services/connectionService.js";
import { recordProfileView } from "../../services/discoveryService.js";
import UserResultCard from "../../components/discovery/UserResultCard.jsx";
import FilterPanel from "../../components/discovery/FilterPanel.jsx";
import SearchBar from "../../components/discovery/SearchBar.jsx";
import EmptyResult from "../../components/discovery/EmptyResult.jsx";
import { Loading } from "../../components/common/UI.jsx";
export default function SearchResults() {
  const [params] = useSearchParams();
  const { profiles, filters, load, loading, error } = useDiscovery({
    q: params.get("q") || "",
  });
  const connect = async (id) => {
    try {
      await sendConnectionRequest(id);
      toast.success("Connection request sent");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const view = (id) => recordProfileView(id).catch(() => {});
  if (loading) return <Loading />;
  return (
    <div className="page discovery-page">
      <header>
        <div>
          <p className="eyebrow">Professional network</p>
          <h1>Search results</h1>
        </div>
      </header>
      <SearchBar
        initialValue={filters.q}
        onSearch={(q) => load({ ...filters, q })}
      />
      <div className="discovery-layout">
        <FilterPanel filters={filters} onChange={load} />
        <main className="discovery-results">
          {error ? (
            <EmptyResult>{error}</EmptyResult>
          ) : profiles.length ? (
            <div className="discovery-results-grid">
              {profiles.map((profile) => (
                <UserResultCard
                  key={profile._id}
                  profile={profile}
                  onConnect={connect}
                  onView={view}
                />
              ))}
            </div>
          ) : (
            <EmptyResult />
          )}
        </main>
      </div>
    </div>
  );
}
