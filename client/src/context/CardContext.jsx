import { createContext, useCallback, useEffect, useState } from "react";
import { getMyCard, updateMyCard } from "../services/cardService.js";

// eslint-disable-next-line react-refresh/only-export-components
export const CardContext = createContext(null);

export function CardProvider({ children }) {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshCard = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getMyCard();
      setCard(result.data);
      return result.data;
    } finally {
      setLoading(false);
    }
  }, []);
  const saveCard = async (payload) => {
    const result = await updateMyCard(payload);
    setCard(result.data);
    return result.data;
  };
  useEffect(() => {
    getMyCard()
      .then((result) => setCard(result.data))
      .catch(() => setCard(null))
      .finally(() => setLoading(false));
  }, []);
  return (
    <CardContext.Provider value={{ card, loading, refreshCard, saveCard }}>
      {children}
    </CardContext.Provider>
  );
}
