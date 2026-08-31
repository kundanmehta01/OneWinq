import { useState } from "react";
import { Button, Input, Select } from "../common/UI.jsx";
const themes = ["CLASSIC", "MODERN", "MINIMAL", "DARK_LUXURY", "NEON_VIBRANT"];
const toggles = [
  ["showPhoto", "Show profile photo"],
  ["showHeadline", "Show headline"],
  ["showSocialLinks", "Show social links"],
  ["showServices", "Show services"],
  ["showQRCode", "Show QR / share area"],
];
export default function CardForm({
  card,
  onSubmit,
  saving,
  submitLabel = "Save card",
}) {
  const [form, setForm] = useState(() => ({
    theme: card?.theme || "MODERN",
    sharingEnabled: card?.sharingEnabled ?? true,
    layout: {
      showPhoto: true,
      showHeadline: true,
      showSocialLinks: true,
      showServices: true,
      showQRCode: true,
      customColor: "#6366f1",
      ...card?.layout,
    },
  }));
  const setLayout = (key, value) =>
    setForm({ ...form, layout: { ...form.layout, [key]: value } });
  return (
    <form
      className="panel card-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <Select
        label="Card theme"
        value={form.theme}
        onChange={(e) => setForm({ ...form, theme: e.target.value })}
      >
        {themes.map((theme) => (
          <option key={theme}>{theme}</option>
        ))}
      </Select>
      <Input
        label="Accent color"
        type="color"
        value={form.layout.customColor}
        onChange={(e) => setLayout("customColor", e.target.value)}
      />
      {toggles.map(([key, label]) => (
        <label className="toggle" key={key}>
          <input
            type="checkbox"
            checked={Boolean(form.layout[key])}
            onChange={(e) => setLayout(key, e.target.checked)}
          />
          {label}
        </label>
      ))}
      <label className="toggle">
        <input
          type="checkbox"
          checked={form.sharingEnabled}
          onChange={(e) =>
            setForm({ ...form, sharingEnabled: e.target.checked })
          }
        />
        Allow anyone with the link to view this card
      </label>
      <Button disabled={saving}>{saving ? "Saving…" : submitLabel}</Button>
    </form>
  );
}
