import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {
  getEngagementFeed,
  createThought,
  deleteThought,
  toggleThoughtLike,
  getThoughtComments,
  addThoughtComment,
} from "../services/engagementService.js";
import { getDashboard } from "../services/dashboardService.js";
import { getViewAnalytics, getRecentViews } from "../services/discoveryService.js";

const isSameId = (a, b) => Boolean(a && b) && String(a) === String(b);

// Core engagement hook: owns the feed, composer actions, and derived stats.
export function useEngagement() {
  const { user } = useAuth();
  const [thoughts, setThoughts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState(null);
  const [openComments, setOpenComments] = useState({});
  const [busyId, setBusyId] = useState(null);

  const requestFeed = useCallback(async (params = {}) => {
    try {
      const response = await getEngagementFeed(params);
      setThoughts(response.data.items || []);
      setPagination(response.data.pagination || null);
      setError("");
    } catch (err) {
      setError(err.message || "Unable to load the feed.");
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(
    async (params = {}) => {
      setLoading(true);
      setError("");
      await requestFeed(params);
    },
    [requestFeed],
  );

  useEffect(() => {
    getEngagementFeed()
      .then((response) => {
        setThoughts(response.data.items || []);
        setPagination(response.data.pagination || null);
      })
      .catch((err) => setError(err.message || "Unable to load the feed."))
      .finally(() => setLoading(false));
    getDashboard()
      .then((response) => setMetrics(response.data?.metrics || null))
      .catch(() => setMetrics(null));
  }, []);

  const publish = useCallback(
    async (content, { tags = [], visibility = "PUBLIC" } = {}) => {
      const response = await createThought({ content, tags, visibility });
      await requestFeed();
      return response.data;
    },
    [requestFeed],
  );

  const remove = useCallback(async (id) => {
    setBusyId(id);
    try {
      await deleteThought(id);
      setThoughts((prev) => prev.filter((t) => t._id !== id));
    } finally {
      setBusyId(null);
    }
  }, []);

  const toggleLike = useCallback(async (id) => {
    const response = await toggleThoughtLike(id);
    const liked = Boolean(response.data?.liked);
    setThoughts((prev) =>
      prev.map((t) =>
        t._id === id
          ? {
              ...t,
              isLiked: liked,
              likeCount: Math.max(0, (t.likeCount || 0) + (liked ? 1 : -1)),
            }
          : t,
      ),
    );
    return liked;
  }, []);

  // `entry` is the current comment-thread state for the thought, passed in by
  // the caller so the hook never reads state during render.
  const toggleComments = useCallback(async (thoughtId, entry = {}) => {
    const open = !entry.open;
    setOpenComments((prev) => ({
      ...prev,
      [thoughtId]: { ...prev[thoughtId], open },
    }));
    if (open && !entry.items) {
      try {
        const response = await getThoughtComments(thoughtId);
        setOpenComments((prev) => ({
          ...prev,
          [thoughtId]: { ...prev[thoughtId], items: response.data.items || [] },
        }));
      } catch {
        setOpenComments((prev) => ({
          ...prev,
          [thoughtId]: { ...prev[thoughtId], items: [] },
        }));
      }
    }
  }, []);

  const comment = useCallback(async (thoughtId, content) => {
    await addThoughtComment(thoughtId, content);
    const response = await getThoughtComments(thoughtId);
    setOpenComments((prev) => ({
      ...prev,
      [thoughtId]: {
        ...prev[thoughtId],
        open: true,
        items: response.data.items || [],
      },
    }));
    setThoughts((prev) =>
      prev.map((t) =>
        t._id === thoughtId
          ? { ...t, commentCount: (t.commentCount || 0) + 1 }
          : t,
      ),
    );
  }, []);

  // Stats for the EngagementStats band: counts sourced from the dashboard
  // metrics endpoint plus engagement totals aggregated from the loaded feed.
  const stats = useMemo(() => {
    const mine = thoughts.filter((t) => isSameId(t.authorId, user?._id));
    return {
      thoughtsPublished: metrics?.publishedThoughtsCount ?? mine.length,
      profileViews: metrics?.totalProfileViews ?? 0,
      viewsLast7Days: metrics?.viewsLast7Days ?? 0,
      likesReceived: mine.reduce((sum, t) => sum + (t.likeCount || 0), 0),
      commentsReceived: mine.reduce((sum, t) => sum + (t.commentCount || 0), 0),
    };
  }, [thoughts, metrics, user]);

  return {
    user,
    thoughts,
    pagination,
    loading,
    error,
    metrics,
    stats,
    openComments,
    busyId,
    refresh,
    publish,
    remove,
    toggleLike,
    toggleComments,
    comment,
  };
}

// Analytics hook: profile reach (views) + engagement breakdown for the chart.
export function useEngagementAnalytics() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      getViewAnalytics().catch(() => ({ data: null })),
      getEngagementFeed({ limit: 50 }).catch(() => ({ data: { items: [] } })),
    ])
      .then(([views, feed]) => {
        if (!active) return;
        setAnalytics(views.data || null);
        setThoughts(feed.data?.items || []);
        setError("");
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const summary = useMemo(() => {
    const mine = thoughts.filter((t) => isSameId(t.authorId, user?._id));
    const topThoughts = [...mine]
      .sort(
        (a, b) =>
          (b.likeCount || 0) +
          (b.commentCount || 0) -
          ((a.likeCount || 0) + (a.commentCount || 0)),
      )
      .slice(0, 6);
    return {
      totalViews: analytics?.totalViews ?? 0,
      viewsLast7Days: analytics?.viewsLast7Days ?? 0,
      thoughtsPublished: mine.length,
      likesReceived: mine.reduce((sum, t) => sum + (t.likeCount || 0), 0),
      commentsReceived: mine.reduce((sum, t) => sum + (t.commentCount || 0), 0),
      topThoughts,
    };
  }, [analytics, thoughts, user]);

  return { analytics, thoughts, summary, loading, error };
}

// Activity hook: merges the user's published thoughts with profiles they
// recently viewed into a single reverse-chronological activity stream.
export function useEngagementActivity() {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      getEngagementFeed({ limit: 50 }).catch(() => ({ data: { items: [] } })),
      getRecentViews({ limit: 10 }).catch(() => ({ data: { items: [] } })),
    ])
      .then(([feed, views]) => {
        if (!active) return;
        const thoughtActivity = (feed.data?.items || [])
          .filter((t) => isSameId(t.authorId, user?._id))
          .map((t) => ({
            id: `thought-${t._id}`,
            kind: "thought",
            date: t.createdAt,
            thought: t,
          }));
        const viewActivity = (views.data?.items || [])
          .filter((v) => v.profile)
          .map((v, index) => ({
            id: `view-${index}-${v.viewedAt}`,
            kind: "view",
            date: v.viewedAt,
            profile: v.profile,
          }));
        setActivities(
          [...thoughtActivity, ...viewActivity].sort(
            (a, b) => new Date(b.date) - new Date(a.date),
          ),
        );
        setError("");
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [user]);

  return { activities, loading, error };
}

// Visitors hook: "who viewed my profile" data from the discovery analytics
// endpoint (totalViews, viewsLast7Days, recentViewers).
export function useEngagementVisitors() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getViewAnalytics()
      .then((response) => {
        if (!active) return;
        setAnalytics(response.data || null);
        setError("");
      })
      .catch((err) =>
        active && setError(err.message || "Unable to load visitors."),
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const visitors = useMemo(() => analytics?.recentViewers || [], [analytics]);

  return { analytics, visitors, loading, error };
}

export const timeAgo = (dateInput) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (Number.isNaN(seconds)) return "";
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};
