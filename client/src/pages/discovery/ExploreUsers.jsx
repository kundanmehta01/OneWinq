import toast from "react-hot-toast";
import { useDiscovery } from "../../hooks/useDiscovery.js";
import { sendConnectionRequest } from "../../services/connectionService.js";
import { recordProfileView } from "../../services/discoveryService.js";
import UserResultCard from "../../components/discovery/UserResultCard.jsx";
import CategoryFilter from "../../components/discovery/CategoryFilter.jsx";
import EmptyResult from "../../components/discovery/EmptyResult.jsx";
import { Loading } from "../../components/common/UI.jsx";
export default function ExploreUsers() {
  const { profiles, filters, load, loading, error } = useDiscovery();
  if (loading) return <Loading />;
  const connect = async (id) => {
    try {
      await sendConnectionRequest(id);
      toast.success("Connection request sent");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="page discovery-page">
      <header>
        <div>
          <p className="eyebrow">Professional network</p>
          <h1>Explore people</h1>
        </div>
      </header>
      <CategoryFilter
        value={filters.profileType || ""}
        onChange={(profileType) => load({ profileType })}
      />
      {error ? (
        <EmptyResult>{error}</EmptyResult>
      ) : profiles.length ? (
        <div className="discovery-results-grid explore-grid">
          {profiles.map((profile) => (
            <UserResultCard
              key={profile._id}
              profile={profile}
              onConnect={connect}
              onView={(id) => recordProfileView(id).catch(() => {})}
            />
          ))}
        </div>
      ) : (
        <EmptyResult />
      )}
    </div>
  );
}
