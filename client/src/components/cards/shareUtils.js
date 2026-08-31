export function cardShareUrl(slug) {
  if (!slug) return "";
  return `${window.location.origin}/cards/${slug}`;
}

export function qrImageUrl(data) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(data)}`;
}
