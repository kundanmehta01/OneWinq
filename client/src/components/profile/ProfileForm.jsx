import { useState } from "react";
import { Button, Input } from "../common/UI.jsx";
const initial = (profile) => ({
  firstName: profile?.firstName || "",
  lastName: profile?.lastName || "",
  displayName: profile?.displayName || "",
  designation: profile?.designation || "",
  introduction: profile?.introduction || "",
  about: profile?.about || "",
  contact: {
    email: profile?.contact?.email || "",
    phone: profile?.contact?.phone || "",
    location: profile?.contact?.location || "",
    website: profile?.contact?.website || "",
  },
  skills: (profile?.skills || []).join(", "),
});
export default function ProfileForm({ profile, onSubmit, saving }) {
  const [form, setForm] = useState(() => initial(profile));
  const change = (field, value) => setForm({ ...form, [field]: value });
  const contact = (field, value) =>
    setForm({ ...form, contact: { ...form.contact, [field]: value } });
  return (
    <form
      className="panel profile-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          ...form,
          skills: form.skills
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        });
      }}
    >
      <Input
        label="First name"
        value={form.firstName}
        onChange={(e) => change("firstName", e.target.value)}
      />
      <Input
        label="Last name"
        value={form.lastName}
        onChange={(e) => change("lastName", e.target.value)}
      />
      <Input
        label="Display name"
        value={form.displayName}
        onChange={(e) => change("displayName", e.target.value)}
      />
      <Input
        label="Professional headline"
        value={form.designation}
        onChange={(e) => change("designation", e.target.value)}
      />
      <Input
        label="Location"
        value={form.contact.location}
        onChange={(e) => contact("location", e.target.value)}
      />
      <Input
        label="Website"
        type="url"
        value={form.contact.website}
        onChange={(e) => contact("website", e.target.value)}
      />
      <label className="field full">
        <span>Introduction</span>
        <textarea
          value={form.introduction}
          maxLength="300"
          onChange={(e) => change("introduction", e.target.value)}
        />
      </label>
      <label className="field full">
        <span>About</span>
        <textarea
          value={form.about}
          maxLength="3000"
          onChange={(e) => change("about", e.target.value)}
        />
      </label>
      <Input
        className="full"
        label="Skills (comma separated)"
        value={form.skills}
        onChange={(e) => change("skills", e.target.value)}
      />
      <Button className="full" disabled={saving}>
        {saving ? "Saving…" : "Save profile"}
      </Button>
    </form>
  );
}
