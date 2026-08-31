import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { useCards } from "../../hooks/useCards.js";
import CardForm from "../../components/cards/CardForm.jsx";
import CardTemplate from "../../components/cards/CardTemplate.jsx";
import { Loading } from "../../components/common/UI.jsx";
export default function EditCard() {
  const { card, loading, saveCard } = useCards();
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  if (loading) return <Loading />;
  const save = async (form) => {
    setSaving(true);
    try {
      await saveCard(form);
      toast.success("Card changes saved");
      navigate("/cards");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="page">
      <header>
        <div>
          <p className="eyebrow">Card customizer</p>
          <h1>Edit digital card</h1>
        </div>
      </header>
      <div className="card-editor">
        <CardForm card={card} onSubmit={save} saving={saving} />
        <CardTemplate card={card} preview />
      </div>
    </div>
  );
}
