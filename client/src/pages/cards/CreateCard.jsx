import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { useCards } from "../../hooks/useCards.js";
import CardForm from "../../components/cards/CardForm.jsx";
import { Loading } from "../../components/common/UI.jsx";
export default function CreateCard() {
  const { card, loading, saveCard } = useCards();
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  if (loading) return <Loading />;
  const save = async (form) => {
    setSaving(true);
    try {
      await saveCard(form);
      toast.success("Digital card configured");
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
          <p className="eyebrow">Initial setup</p>
          <h1>Configure your card</h1>
        </div>
      </header>
      <CardForm
        card={card}
        onSubmit={save}
        saving={saving}
        submitLabel="Create card design"
      />
    </div>
  );
}
