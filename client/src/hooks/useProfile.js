import { useEffect, useState } from "react";
import { getMyProfile } from "../services/profileService.js";
export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const refresh = async () => {
    setLoading(true);
    try {
      const response = await getMyProfile();
      setProfile(response.data);
      setError("");
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMyProfile()
      .then((response) => setProfile(response.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  return { profile, loading, error, refresh };
}
