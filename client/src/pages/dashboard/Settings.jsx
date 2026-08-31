import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Bell, KeyRound, LogOut, Share2 } from "lucide-react";
import { profileService, cardService } from "../../services/modules.js";
import { Button, Input, Loading, Select } from "../../components/common/UI.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const NOTIF_KEY = "onewinq_notifications";
const defaultNotifications = {
  connectionRequests: true,
  messages: true,
  profileViews: false,
  weeklyDigest: false,
};

function loadNotifications() {
  try {
    return {
      ...defaultNotifications,
      ...JSON.parse(localStorage.getItem(NOTIF_KEY) || "{}"),
    };
  } catch {
    return defaultNotifications;
  }
}

const notificationOptions = [
  ["connectionRequests", "Connection requests", "When someone wants to connect with you"],
  ["messages", "Messages", "When a conversation gets a new reply"],
  ["profileViews", "Profile views", "When your profile appears in someone's activity"],
  ["weeklyDigest", "Weekly digest", "A summary of your growth every week"],
];

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [card, setCard] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState(loadNotifications);

  useEffect(() => {
    profileService
      .mine()
      .then((response) => setProfile(response.data))
      .catch((error) => toast.error(error.message));
    cardService
      .mine()
      .then((response) => setCard(response.data))
      .catch(() => setCard(null));
  }, []);

  if (!profile) return <Loading />;

  const save = async () => {
    setSaving(true);
    try {
      await Promise.all([
        profileService.visibility(profile.visibility),
        profileService.template(profile.template),
        profileService.update({
          contact: {
            email: profile.contact?.email || undefined,
            phone: profile.contact?.phone || undefined,
            location: profile.contact?.location || undefined,
            website: profile.contact?.website || undefined,
          },
        }),
        card
          ? cardService.update({ sharingEnabled: Boolean(card.sharingEnabled) })
          : Promise.resolve(),
      ]);
      toast.success("Settings saved");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const setContact = (key, value) =>
    setProfile({
      ...profile,
      contact: { ...profile.contact, [key]: value },
    });

  const toggleNotification = (key) => {
    const next = { ...notifications, [key]: !notifications[key] };
    setNotifications(next);
    localStorage.setItem(NOTIF_KEY, JSON.stringify(next));
    toast.success("Notification preference saved");
  };

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-page settings-page">
      <header>
        <div>
          <h1>Settings</h1>
          <p>
            Control discovery, contact details, notifications and how your
            card is shared.
          </p>
        </div>
      </header>

      <section className="panel settings-account">
        <h2>Account</h2>
        <div className="detail-list">
          <div>
            <span>Login email</span>
            <strong>{user?.email || "Not set"}</strong>
          </div>
          <div>
            <span>Login phone</span>
            <strong>{user?.phone || "Not set"}</strong>
          </div>
          <div>
            <span>Email verified</span>
            <strong>{user?.emailVerified ? "Yes" : "No"}</strong>
          </div>
          <div>
            <span>Phone verified</span>
            <strong>{user?.phoneVerified ? "Yes" : "No"}</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>{user?.platformRole || "USER"}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{user?.status || "ACTIVE"}</strong>
          </div>
        </div>
      </section>

      <section className="panel settings-form">
        <h2>Discovery & presentation</h2>
        <Select
          label="Profile visibility"
          value={profile.visibility}
          onChange={(event) =>
            setProfile({ ...profile, visibility: event.target.value })
          }
        >
          <option value="PUBLIC">Public — anyone can find you</option>
          <option value="CONNECTIONS_ONLY">Connections only</option>
          <option value="PRIVATE">Private — hidden from discovery</option>
        </Select>
        <p className="field-hint">
          Public profiles appear in Discover. Connections-only still lets
          accepted contacts open your profile.
        </p>
        <Select
          label="Profile template"
          value={profile.template}
          onChange={(event) =>
            setProfile({ ...profile, template: event.target.value })
          }
        >
          <option value="DEFAULT">Default</option>
          <option value="CEO">CEO</option>
          <option value="FOUNDER">Founder</option>
          <option value="TEAM_MEMBER">Team member</option>
        </Select>
      </section>

      <section className="panel settings-form">
        <h2>Public contact</h2>
        <Input
          label="Contact email"
          type="email"
          value={profile.contact?.email || ""}
          onChange={(event) => setContact("email", event.target.value)}
        />
        <Input
          label="Contact phone"
          value={profile.contact?.phone || ""}
          onChange={(event) => setContact("phone", event.target.value)}
        />
        <Input
          label="Location"
          value={profile.contact?.location || ""}
          onChange={(event) => setContact("location", event.target.value)}
        />
        <Input
          label="Website"
          placeholder="https://"
          value={profile.contact?.website || ""}
          onChange={(event) => setContact("website", event.target.value)}
        />
      </section>

      <section className="panel settings-form">
        <h2>Digital card sharing</h2>
        {card ? (
          <>
            <label className="toggle">
              <input
                type="checkbox"
                checked={Boolean(card.sharingEnabled)}
                onChange={(event) =>
                  setCard({ ...card, sharingEnabled: event.target.checked })
                }
              />
              Anyone with the card link can view it
            </label>
            <p className="field-hint">
              Public card:{" "}
              <Link to={`/cards/${card.slug}`}>/cards/{card.slug}</Link>
            </p>
          </>
        ) : (
          <p className="empty">Your digital card is still being provisioned.</p>
        )}
        <Button onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save settings"}
        </Button>
      </section>

      <section className="panel settings-form">
        <h2>
          <Bell size={16} /> Notifications
        </h2>
        <p className="field-hint">
          These preferences are stored on this device.
        </p>
        {notificationOptions.map(([key, label, hint]) => (
          <label className="toggle notif-row" key={key}>
            <input
              type="checkbox"
              checked={Boolean(notifications[key])}
              onChange={() => toggleNotification(key)}
            />
            <span>
              {label}
              <small>{hint}</small>
            </span>
          </label>
        ))}
      </section>

      <section className="panel settings-form">
        <h2>
          <KeyRound size={16} /> Security
        </h2>
        <div className="detail-list">
          <div>
            <span>Password</span>
            <strong>••••••••</strong>
          </div>
        </div>
        <p className="field-hint">
          Resetting your password signs every device out of your account.
        </p>
        <div className="settings-actions">
          <Link className="button secondary" to="/forgot-password">
            <KeyRound size={15} /> Reset password
          </Link>
          <button className="button secondary" type="button" onClick={signOut}>
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </section>

      <section className="panel settings-form">
        <h2>
          <Share2 size={16} /> Your public links
        </h2>
        <div className="detail-list">
          <div>
            <span>Public profile</span>
            <strong>
              {profile.slug ? (
                <Link to={`/profiles/${profile.slug}`}>
                  /profiles/{profile.slug}
                </Link>
              ) : (
                "Not ready"
              )}
            </strong>
          </div>
          <div>
            <span>Digital card</span>
            <strong>
              {card?.slug ? (
                <Link to={`/cards/${card.slug}`}>/cards/{card.slug}</Link>
              ) : (
                "Provisioning"
              )}
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
}
