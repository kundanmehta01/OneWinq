import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../common/UI.jsx";

const CODE39 = {
  0: "nnnwwnwnn",
  1: "wnnwnnnnw",
  2: "nnwwnnnnw",
  3: "wnwwnnnnn",
  4: "nnnwwnnnw",
  5: "wnnwwnnnn",
  6: "nnwwwnnnn",
  7: "nnnwnnwnw",
  8: "wnnwnnwnn",
  9: "nnwwnnwnn",
  A: "wnnnnwnnw",
  B: "nnwnnwnnw",
  C: "wnwnnwnnn",
  D: "nnnnwwnnw",
  E: "wnnnwwnnn",
  F: "nnwnwwnnn",
  G: "nnnnnwwnw",
  H: "wnnnnwwnn",
  I: "nnwnnwwnn",
  J: "nnnnwwwnn",
  K: "wnnnnnnww",
  L: "nnwnnnnww",
  M: "wnwnnnnwn",
  N: "nnnnwnnww",
  O: "wnnnwnnwn",
  P: "nnwnwnnwn",
  Q: "nnnnnnwww",
  R: "wnnnnnwwn",
  S: "nnwnnnwwn",
  T: "nnnnwnwwn",
  U: "wwnnnnnnw",
  V: "nwwnnnnnw",
  W: "wwwnnnnnn",
  X: "nwnnwnnnw",
  Y: "wwnnwnnnn",
  Z: "nwwnwnnnn",
  "-": "nwnnnnwnw",
  ".": "wwnnnnwnn",
  " ": "nwwnnnwnn",
  "*": "nwnnwnwnn",
};

function barcodeValue(slug = "") {
  const cleaned = slug
    .toUpperCase()
    .replace(/[^0-9A-Z.-]/g, "")
    .slice(0, 18);
  return cleaned || "ONEWINQ";
}

function Code39({ value }) {
  const encoded = `*${barcodeValue(value)}*`;
  const modules = [];
  [...encoded].forEach((char, index) => {
    const pattern = CODE39[char];
    if (!pattern) return;
    [...pattern].forEach((unit, unitIndex) => {
      modules.push({
        bar: unitIndex % 2 === 0,
        wide: unit === "w",
        key: `${index}-${unitIndex}`,
      });
    });
    modules.push({ bar: false, wide: false, key: `gap-${index}` });
  });
  const width = modules.reduce((sum, module) => sum + (module.wide ? 3 : 1), 0);
  let x = 0;
  return (
    <svg
      className="code39"
      viewBox={`0 0 ${width} 60`}
      role="img"
      aria-label={`Barcode ${encoded}`}
    >
      {modules.map((module) => {
        const w = module.wide ? 3 : 1;
        const rect = module.bar ? (
          <rect key={module.key} x={x} y="0" width={w} height="48" fill="#111" />
        ) : null;
        x += w;
        return rect;
      })}
      <text x={width / 2} y="58" textAnchor="middle" fontSize="6" fill="#334">
        {encoded}
      </text>
    </svg>
  );
}

export function cardShareUrl(slug) {
  if (!slug) return "";
  return `${window.location.origin}/cards/${slug}`;
}

export function qrImageUrl(data) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(data)}`;
}

export default function ShareCodes({ card, onEnable }) {
  const [creating, setCreating] = useState(false);
  const shareUrl = cardShareUrl(card?.slug);
  const qrSrc = useMemo(() => (shareUrl ? qrImageUrl(shareUrl) : ""), [shareUrl]);

  const createCodes = async () => {
    if (!card) return;
    setCreating(true);
    try {
      if (onEnable) {
        await onEnable({
          layout: {
            showPhoto: true,
            showHeadline: true,
            showSocialLinks: true,
            showServices: true,
            showQRCode: true,
            customColor: "#6366F1",
            ...card.layout,
            showQRCode: true,
          },
        });
      }
      if (card.slug) localStorage.setItem(`onewinq_barcode_${card.slug}`, "1");
      toast.success("Barcode created for your digital card");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCreating(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Card link copied");
    } catch {
      toast.error("Could not copy the link");
    }
  };

  if (!card) {
    return (
      <section className="panel share-codes">
        <h2>Digital barcode</h2>
        <p>
          Your barcode is created with the digital card when the profile is
          provisioned. Come back after signup completes.
        </p>
      </section>
    );
  }

  return (
    <section className="panel share-codes">
      <div className="section-heading">
        <div>
          <h2>Card barcode</h2>
          <p>Scan the QR or barcode to open your public digital card.</p>
        </div>
        <Button onClick={createCodes} disabled={creating} type="button">
          {creating ? "Creating…" : "Create / refresh barcode"}
        </Button>
      </div>
      {shareUrl ? (
        <div className="share-codes-grid">
          <figure>
            <img src={qrSrc} alt="Digital card QR code" width="180" height="180" />
            <figcaption>QR code</figcaption>
          </figure>
          <div className="share-meta">
            <p>{shareUrl}</p>
            <div>
              <Button variant="secondary" onClick={copyLink} type="button">
                Copy link
              </Button>
              <a className="button secondary" href={qrSrc} download={`onewinq-${card.slug}.png`}>
                Download QR
              </a>
            </div>
          </div>
          <figure className="barcode-figure">
            <Code39 value={card.slug} />
            <figcaption>Barcode · {card.slug}</figcaption>
          </figure>
        </div>
      ) : (
        <p className="empty">Create a barcode to share your card offline.</p>
      )}
    </section>
  );
}

export function CardQrMark({ slug, compact }) {
  const url = cardShareUrl(slug);
  if (!url) return <div className="card-qr">QR</div>;
  return (
    <div className={`card-qr live ${compact ? "tiny" : ""}`}>
      <img src={qrImageUrl(url)} alt="" />
    </div>
  );
}
