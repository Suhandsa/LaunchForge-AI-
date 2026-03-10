import { useContext } from "react";
import { IdeaContext } from "../context/IdeaContext";

export function useIdea() {
  const context = useContext(IdeaContext);
  if (!context) {
    throw new Error("useIdea must be used within IdeaProvider");
  }
  return context;
}
