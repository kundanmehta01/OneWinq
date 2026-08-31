import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { profileService, cardService } from "../../services/modules.js";
import { Button, Input, Loading, Select } from "../../components/common/UI.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Settings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [card, setCard] = useState(null);
  const [saving, setSaving] = useState(false);

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

  return (
    <div className="dashboard-page settings-page">
      <header>
        <div>
          <h1>Profile settings</h1>
          <p>Control discovery, contact details and how your card is shared.</p>
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
    </div>
  );
}
