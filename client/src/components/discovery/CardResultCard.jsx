import { CreditCard } from "lucide-react";
export default function CardResultCard() {
  return (
    <article className="card-result-card">
      <CreditCard size={25} />
      <h3>Public card discovery</h3>
      <p>Cards can currently be opened through their share link.</p>
    </article>
  );
}
