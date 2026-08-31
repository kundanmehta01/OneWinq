import { useEffect, useState } from "react";
import {
  discoverProfiles,
  searchProfiles,
} from "../services/discoveryService.js";
export function useDiscovery(initialFilters = {}) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const load = async (nextFilters = filters) => {
    setLoading(true);
    try {
      const response =
        nextFilters.q ||
        nextFilters.skills ||
        nextFilters.designation ||
        nextFilters.location ||
        nextFilters.profileType
          ? await searchProfiles(nextFilters)
          : await discoverProfiles(nextFilters);
      setProfiles(response.data.items);
      setFilters(nextFilters);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const request =
      initialFilters.q ||
      initialFilters.skills ||
      initialFilters.designation ||
      initialFilters.location ||
      initialFilters.profileType
        ? searchProfiles(initialFilters)
        : discoverProfiles(initialFilters);
    request
      .then((response) => setProfiles(response.data.items))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  return { profiles, loading, error, filters, load };
}
