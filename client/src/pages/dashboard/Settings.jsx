import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { profileService } from "../../services/modules.js";
import { Button, Loading, Select } from "../../components/common/UI.jsx";
export default function Settings() {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    profileService
      .mine()
      .then((response) => setProfile(response.data))
      .catch((error) => toast.error(error.message));
  }, []);
  if (!profile) return <Loading />;
  const save = async () => {
    setSaving(true);
    try {
      await Promise.all([
        profileService.visibility(profile.visibility),
        profileService.template(profile.template),
      ]);
      toast.success("Settings saved");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="dashboard-page">
      <header>
        <div>
          <h1>Profile settings</h1>
          <p>Control how your identity is presented and who can find it.</p>
        </div>
      </header>
      <section className="panel settings-form">
        <Select
          label="Profile visibility"
          value={profile.visibility}
          onChange={(event) =>
            setProfile({ ...profile, visibility: event.target.value })
          }
        >
          <option value="PUBLIC">Public</option>
          <option value="CONNECTIONS_ONLY">Connections only</option>
          <option value="PRIVATE">Private</option>
        </Select>
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
        <Button onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save settings"}
        </Button>
      </section>
    </div>
  );
}
