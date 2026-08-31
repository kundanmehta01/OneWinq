import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { messageService } from "../../services/modules.js";
import { getConnections } from "../../services/connectionService.js";
import { Button, Empty, Loading } from "../../components/common/UI.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const otherUserId = (connection) =>
  connection?.user?.userId?._id ||
  connection?.user?.userId ||
  connection?.user?._id;

const displayName = (profile) =>
  profile?.displayName ||
  [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
  profile?.contact?.email ||
  "Conversation";

function formatWhen(value) {
  if (!value) return "";
  const date = new Date(value);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  if (sameDay) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { day: "numeric", month: "short" });
}

export default function Messages() {
  const [conversations, setConversations] = useState();
  const [connections, setConnections] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingThread, setLoadingThread] = useState(false);
  const [text, setText] = useState("");
  const [compose, setCompose] = useState({ recipientId: "", content: "" });
  const [starting, setStarting] = useState(false);
  const [sending, setSending] = useState(false);
  const bubblesRef = useRef(null);
  const { user } = useAuth();

  const loadInbox = async () => {
    const result = await messageService.conversations();
    setConversations(result.data.items);
    return result.data.items;
  };

  useEffect(() => {
    let cancelled = false;
    const bootstrap = async () => {
      try {
        const result = await messageService.conversations();
        if (!cancelled) setConversations(result.data.items);
      } catch (error) {
        if (!cancelled) {
          toast.error(error.message);
          setConversations([]);
        }
      }
      try {
        const result = await getConnections();
        if (!cancelled) setConnections(result.data.items || []);
      } catch {
        if (!cancelled) setConnections([]);
      }
    };
    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    bubblesRef.current?.scrollTo({ top: bubblesRef.current.scrollHeight });
  }, [messages, active]);

  const activeIds = useMemo(() => {
    const ids = new Set();
    (conversations || []).forEach((item) => {
      const id = item.participant?.userId?._id || item.participant?.userId;
      if (id) ids.add(String(id));
    });
    return ids;
  }, [conversations]);

  const startable = connections.filter((item) => {
    const id = otherUserId(item);
    return id && !activeIds.has(String(id));
  });

  const select = async (conversation) => {
    setActive(conversation);
    setLoadingThread(true);
    try {
      const result = await messageService.messages(conversation._id);
      setMessages(result.data.items);
      // Fetching messages marks the conversation read on the server,
      // so clear the badge locally without waiting for a refetch.
      setConversations((current = []) =>
        current.map((item) =>
          item._id === conversation._id ? { ...item, unreadCount: 0 } : item
        )
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingThread(false);
    }
  };

  const reply = async (event) => {
    event.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await messageService.reply(active._id, text.trim());
      setText("");
      const result = await messageService.messages(active._id);
      setMessages(result.data.items);
      await loadInbox();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSending(false);
    }
  };

  const startConversation = async (event) => {
    event.preventDefault();
    if (!compose.recipientId) {
      toast.error("Choose a connection to message");
      return;
    }
    if (!compose.content.trim()) {
      toast.error("Write a first message");
      return;
    }
    setStarting(true);
    const recipientId = compose.recipientId;
    try {
      await messageService.send(recipientId, compose.content.trim());
      toast.success("Conversation started");
      setCompose({ recipientId: "", content: "" });
      const items = await loadInbox();
      const opened = items.find((item) => {
        const id = item.participant?.userId?._id || item.participant?.userId;
        return String(id) === String(recipientId);
      });
      if (opened) await select(opened);
      else if (items[0]) await select(items[0]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setStarting(false);
    }
  };

  if (!conversations) return <Loading />;

  return (
    <div className="page">
      <header>
        <div>
          <p className="eyebrow">Communication</p>
          <h1>Messages</h1>
        </div>
      </header>
      <form className="panel start-conversation" onSubmit={startConversation}>
        <div>
          <h2>Start a conversation</h2>
          <p>
            You can message people you are already connected with. The first
            note creates the thread.
          </p>
        </div>
        {startable.length ? (
          <>
            <label className="field">
              <span>Connection</span>
              <select
                value={compose.recipientId}
                onChange={(event) =>
                  setCompose({ ...compose, recipientId: event.target.value })
                }
                required
              >
                <option value="">Select a connection</option>
                {startable.map((item) => (
                  <option
                    key={item.connectionId || otherUserId(item)}
                    value={otherUserId(item)}
                  >
                    {displayName(item.user)}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>First message</span>
              <input
                value={compose.content}
                maxLength={2000}
                placeholder="Say hello…"
                onChange={(event) =>
                  setCompose({ ...compose, content: event.target.value })
                }
                required
              />
            </label>
            <Button disabled={starting}>
              {starting ? "Starting…" : "Start conversation"}
            </Button>
          </>
        ) : (
          <Empty>
            {connections.length ? (
              "Every connection already has a thread in your inbox."
            ) : (
              <>
                Connect with someone first, then start a chat.{" "}
                <Link to="/connections/find">Find people</Link>
              </>
            )}
          </Empty>
        )}
      </form>
      <div className="messenger">
        <section className="inbox">
          {conversations.length ? (
            conversations.map((conversation) => (
              <button
                className={active?._id === conversation._id ? "selected" : ""}
                onClick={() => select(conversation)}
                key={conversation._id}
                type="button"
              >
                <strong>
                  {displayName(conversation.participant)}
                  {conversation.unreadCount > 0 && (
                    <em className="unread-dot">{conversation.unreadCount}</em>
                  )}
                </strong>
                <span>{conversation.lastMessage?.content}</span>
                {conversation.lastMessage?.sentAt && (
                  <small className="thread-time">
                    {formatWhen(conversation.lastMessage.sentAt)}
                  </small>
                )}
              </button>
            ))
          ) : (
            <Empty>Your inbox is empty.</Empty>
          )}
        </section>
        <section className="thread">
          {active ? (
            <>
              <div className="thread-title">
                {displayName(active.participant)}
              </div>
              <div className="bubbles" ref={bubblesRef}>
                {loadingThread ? (
                  <p className="empty">Loading messages…</p>
                ) : messages.length ? (
                  messages.map((message) => {
                    const mine =
                      String(message.senderId?._id || message.senderId) ===
                      String(user?._id);
                    return (
                      <p className={mine ? "mine" : ""} key={message._id}>
                        {message.content}
                        <small>{formatWhen(message.createdAt)}</small>
                      </p>
                    );
                  })
                ) : (
                  <p className="empty">No messages yet — say hello.</p>
                )}
              </div>
              <form onSubmit={reply}>
                <input
                  value={text}
                  maxLength={2000}
                  placeholder="Write a message"
                  onChange={(event) => setText(event.target.value)}
                />
                <Button disabled={sending}>
                  {sending ? "Sending…" : "Send"}
                </Button>
              </form>
            </>
          ) : (
            <Empty>Select a conversation, or start a new one above.</Empty>
          )}
        </section>
      </div>
    </div>
  );
}
