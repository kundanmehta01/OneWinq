export function prettifyContact(source) {
  if (!source) return "";
  if (source.includes("@")) {
    const prefix = source.split("@")[0];
    return prefix
      .replace(/[._\-+\d]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }
  return source;
}

export function resolveProfileName(profile, fallbackUser) {
  const direct =
    profile?.displayName ||
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ");
  if (direct && direct.trim()) return direct.trim();

  const contact =
    fallbackUser?.email ||
    fallbackUser?.phone ||
    profile?.userId?.email ||
    profile?.userId?.phone ||
    profile?.user?.email ||
    profile?.user?.phone;
  if (contact) {
    const pretty = prettifyContact(contact);
    if (pretty) return pretty;
  }
  return "OneWinq member";
}

export function nameInitial(name) {
  const letter = (name || "").trim().charAt(0);
  return letter ? letter.toUpperCase() : "O";
}
