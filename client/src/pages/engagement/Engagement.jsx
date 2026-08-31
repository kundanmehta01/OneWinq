import { useState } from "react";
import toast from "react-hot-toast";
import { MessageCircle, ThumbsUp, Trash2 } from "lucide-react";
import { useEngagement, timeAgo } from "../../hooks/useEngagement.js";
import EngagementStats from "../../components/engagement/EngagementStats.jsx";
import { Button, Empty, Loading } from "../../components/common/UI.jsx";
import EngagementTabs from "./EngagementTabs.jsx";

const isSameId = (a, b) => Boolean(a && b) && String(a) === String(b);

function Composer({ onPublish }) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    try {
      const tagList = tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean);
      await onPublish(trimmed, { tags: tagList, visibility });
      setContent("");
      setTags("");
      toast.success("Thought published");
    } catch (err) {
      toast.error(err.message || "Unable to publish the thought.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="composer panel" onSubmit={submit}>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Share an idea with your network…"
        maxLength={3000}
        required
      />
      <div className="composer-row">
        <input
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="Tags (comma separated)"
        />
        <select value={visibility} onChange={(event) => setVisibility(event.target.value)}>
          <option value="PUBLIC">Public</option>
          <option value="CONNECTIONS_ONLY">Connections only</option>
        </select>
        <Button type="submit" disabled={submitting || !content.trim()}>
          {submitting ? "Publishing…" : "Publish thought"}
        </Button>
      </div>
    </form>
  );
}

function CommentThread({ thoughtId, thread, onComment }) {
  const [draft, setDraft] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    try {
      await onComment(thoughtId, trimmed);
      setDraft("");
    } catch (err) {
      toast.error(err.message || "Unable to add the comment.");
    }
  };

  return (
    <div className="comment-thread">
      {(thread?.items || []).map((item) => (
        <div className="comment" key={item._id}>
          <strong>{item.profileId?.displayName || "OneWinq member"}</strong>
          <span>{timeAgo(item.createdAt)}</span>
          <p>{item.content}</p>
        </div>
      ))}
      <form onSubmit={submit}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Write a comment…"
          maxLength={1000}
        />
        <Button type="submit" variant="secondary" disabled={!draft.trim()}>
          Reply
        </Button>
      </form>
    </div>
  );
}

function Thought({ thought, currentUserId, engagement }) {
  const { openComments, busyId, toggleLike, toggleComments, comment, remove } =
    engagement;
  const author = thought.profileId || {};
  const isMine = isSameId(thought.authorId, currentUserId);
  const thread = openComments[thought._id];

  const onLike = async () => {
    try {
      await toggleLike(thought._id);
    } catch (err) {
      toast.error(err.message || "Unable to update the like.");
    }
  };

  const onDelete = async () => {
    try {
      await remove(thought._id);
      toast.success("Thought deleted");
    } catch (err) {
      toast.error(err.message || "Unable to delete the thought.");
    }
  };

  return (
    <article className="post panel">
      <div>
        <strong>{author.displayName || "OneWinq member"}</strong>
        <span>
          {author.designation ? `${author.designation} · ` : ""}
          {timeAgo(thought.createdAt)}
        </span>
        {isMine && (
          <button
            type="button"
            className="post-delete"
            aria-label="Delete thought"
            disabled={busyId === thought._id}
            onClick={onDelete}
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      <p>{thought.content}</p>
      {thought.tags?.length > 0 && (
        <div className="post-tags">
          {thought.tags.map((tag) => (
            <span className="badge" key={tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div>
        <Button variant="secondary" onClick={onLike} className={thought.isLiked ? "liked" : ""}>
          <ThumbsUp size={15} />
          {thought.likeCount || 0}
        </Button>
        <Button variant="secondary" onClick={() => toggleComments(thought._id, thread)}>
          <MessageCircle size={15} />
          {`${thought.commentCount || 0} ${thought.commentCount === 1 ? "comment" : "comments"}`}
        </Button>
      </div>
      {thread?.open && (
        <CommentThread thoughtId={thought._id} thread={thread} onComment={comment} />
      )}
    </article>
  );
}

export default function Engagement() {
  const engagement = useEngagement();
  const { thoughts, loading, error, stats, publish, user } = engagement;

  return (
    <div className="page engagement-page">
      <header>
        <div>
          <p className="eyebrow">Professional engagement</p>
          <h1>Network feed</h1>
        </div>
        <EngagementTabs />
      </header>
      <EngagementStats stats={stats} />
      <Composer onPublish={publish} />
      {loading ? (
        <Loading />
      ) : error ? (
        <Empty>{error}</Empty>
      ) : (
        <div className="feed">
          {thoughts.length ? (
            thoughts.map((thought) => (
              <Thought
                key={thought._id}
                thought={thought}
                currentUserId={user?._id}
                engagement={engagement}
              />
            ))
          ) : (
            <Empty>No thoughts have been published yet.</Empty>
          )}
        </div>
      )}
    </div>
  );
}
