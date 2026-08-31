import { useContext } from "react";
import { CardContext } from "../context/CardContext.jsx";
export function useCards() {
  const context = useContext(CardContext);
  if (!context) throw new Error("useCards must be used inside CardProvider");
  return context;
}
