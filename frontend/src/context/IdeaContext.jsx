import { createContext, useState, useCallback } from "react";

export const IdeaContext = createContext(null);

export function IdeaProvider({ children }) {
  const [currentIdea, setCurrentIdea] = useState(null);

  const setIdea = useCallback((idea) => {
    setCurrentIdea(idea);
  }, []);

  const clearIdea = useCallback(() => {
    setCurrentIdea(null);
  }, []);

  return (
    <IdeaContext.Provider value={{ currentIdea, setIdea, clearIdea }}>
      {children}
    </IdeaContext.Provider>
  );
}
