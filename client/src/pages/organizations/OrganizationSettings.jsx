import { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import OrganizationHeader from "../../components/organizations/OrganizationHeader.jsx";
import { CARD_THEMES, useOrganization } from "../../hooks/useOrganizations.js";
import { Button, Empty, Loading, Select } from "../../components/common/UI.jsx";

function SettingsForm({ initial, isAdmin, busy, onSave }) {
  const [allowSelfJoin, setAllowSelfJoin] = useState(Boolean(initial?.allowSelfJoin));
  const [customBranding, setCustomBranding] = useState(Boolean(initial?.customBranding));
  const [defaultCardTheme, setDefaultCardTheme] = useState(initial?.defaultCardTheme || "MODERN");

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    await onSave({ allowSelfJoin, customBranding, defaultCardTheme });
  };

  return (
    <form className="settings-form org-settings panel" onSubmit={submit}>
      <label className="toggle-row">
        <input
          type="checkbox"
          checked={allowSelfJoin}
          disabled={!isAdmin || busy}
          onChange={(event) => setAllowSelfJoin(event.target.checked)}
        />
        <span>
          <strong>Allow self-join</strong>
          People can join this organization without a manual invite.
        </span>
      </label>
      <label className="toggle-row">
        <input
          type="checkbox"
          checked={customBranding}
          disabled={!isAdmin || busy}
          onChange={(event) => setCustomBranding(event.target.checked)}
        />
        <span>
          <strong>Custom branding</strong>
          Use the organization logo and name on member digital cards.
        </span>
      </label>
      <Select
        label="Default card theme"
        value={defaultCardTheme}
        disabled={!isAdmin || busy}
        onChange={(event) => setDefaultCardTheme(event.target.value)}
      >
        {CARD_THEMES.map((theme) => (
          <option key={theme} value={theme}>
            {theme.replaceAll("_", " ")}
          </option>
        ))}
      </Select>
      {isAdmin ? (
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : "Save settings"}
        </Button>
      ) : (
        <p className="org-note">Only owners and admins can change organization settings.</p>
      )}
    </form>
  );
}

export default function OrganizationSettings() {
  const { id } = useParams();
  const org = useOrganization(id);
  const [busy, setBusy] = useState(false);

  if (org.loading) return <div className="page"><Loading /></div>;
  if (org.error || !org.organization) {
    return (
      <div className="page">
        <Empty>{org.error || "Organization not found."}</Empty>
      </div>
    );
  }

  const handleSave = async (settings) => {
    setBusy(true);
    try {
      await org.save({ settings });
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err.message || "Unable to save the settings.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page">
      <OrganizationHeader
        organization={org.organization}
        metrics={org.metrics}
        canEdit={org.isAdmin}
      />
      <SettingsForm
        key={org.organization._id}
        initial={org.organization.settings}
        isAdmin={org.isAdmin}
        busy={busy}
        onSave={handleSave}
      />
    </div>
  );
}
