import { useState } from "react";
import { Button, Input } from "../common/UI.jsx";

export default function OrganizationForm({
  initial = {},
  submitLabel = "Save",
  busy = false,
  onSubmit,
}) {
  const [name, setName] = useState(initial.name || "");
  const [domain, setDomain] = useState(initial.domain || "");
  const [logo, setLogo] = useState(initial.logo || "");

  const submit = async (event) => {
    event.preventDefault();
    if (busy || name.trim().length < 2) return;
    await onSubmit({
      name: name.trim(),
      domain: domain.trim(),
      logo: logo.trim(),
    });
  };

  return (
    <form className="org-form panel" onSubmit={submit}>
      <Input
        label="Organization name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Acme Pvt Ltd"
        minLength={2}
        required
      />
      <Input
        label="Domain (optional)"
        value={domain}
        onChange={(event) => setDomain(event.target.value)}
        placeholder="acme.com"
      />
      <Input
        label="Logo URL (optional)"
        type="url"
        value={logo}
        onChange={(event) => setLogo(event.target.value)}
        placeholder="https://acme.com/logo.png"
      />
      <Button type="submit" disabled={busy || name.trim().length < 2}>
        {busy ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
