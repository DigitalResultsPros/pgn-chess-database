import { useState, useCallback } from 'react';
import type { StoredPgn } from '../types';
import { parsePgn } from '../services/pgnService';

const STORAGE_KEY = 'pgnChessDatabase';

const IMMORTAL_GAME_PGN = `
[Event "Immortal Game"]
[Site "London"]
[Date "1851.06.21"]
[Round "?"]
[White "Adolf Anderssen"]
[Black "Lionel Kieseritzky"]
[Result "1-0"]
[ECO "C33"]
[PlyCount "45"]

1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 b5 5. Bxb5 Nf6 6. Nf3 Qh6 7. d3
Nh5 8. Nh4 Qg5 9. Nf5 c6 10. g4 Nf6 11. Rg1 cxb5 12. h4 Qg6 13. h5 Qg5
14. Qf3 Ng8 15. Bxf4 Qf6 16. Nc3 Bc5 17. Nd5 Qxb2 18. Bd6 Bxg1 19. e5
Qxa1+ 20. Ke2 Na6 21. Nxg7+ Kd8 22. Qf6+ Nxf6 23. Be7# 1-0
`;

/**
 * Initializes the PGN store by loading from localStorage.
 * If localStorage is empty, it creates a default sample game.
 * It also includes robust error handling for corrupted localStorage data.
 */
const getInitialPgns = (): StoredPgn[] => {
  try {
    const item = window.localStorage.getItem(STORAGE_KEY);
    if (item) {
      const data = JSON.parse(item);
      if (Array.isArray(data)) {
        return data; // Successfully loaded games
      }
    }
  } catch (error) {
    console.error("Error reading PGNs from localStorage, clearing corrupted data.", error);
    // If parsing fails, the data is corrupt. Clear it to prevent a crash loop.
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (removeError) {
       console.error("Failed to clear corrupted localStorage", removeError);
    }
  }
  
  // If local storage is empty or corrupt, create the sample game.
  const parsedGame = parsePgn(IMMORTAL_GAME_PGN);
  if (parsedGame) {
    const samplePgn: StoredPgn = {
      id: 'sample-immortal-game',
      pgnString: IMMORTAL_GAME_PGN,
      headers: parsedGame.headers,
    };
    return [samplePgn];
  }

  // Default to an empty list if sample parsing fails for some reason.
  return [];
};


export const usePgnStore = () => {
  const [pgns, setPgns] = useState<StoredPgn[]>(() => getInitialPgns());

  const savePgns = (newPgns: StoredPgn[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newPgns));
      setPgns(newPgns);
    } catch (error) {
      console.error("Error saving PGNs to localStorage", error);
    }
  };

  const addPgn = useCallback((pgnString: string): StoredPgn | null => {
    if (!pgnString.trim()) return null;
    
    const parsedGame = parsePgn(pgnString);
    if (!parsedGame) {
      alert("Invalid PGN format. The PGN data could not be read.");
      return null;
    }
    const { headers } = parsedGame;

    if (!headers.White || !headers.Black) {
      alert("PGN must contain at least White and Black headers.");
      return null;
    }
    const newPgn: StoredPgn = {
      id: `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
      pgnString,
      headers,
    };
    const updatedPgns = [...pgns, newPgn];
    savePgns(updatedPgns);
    return newPgn;
  }, [pgns]);

  const getPgnById = useCallback((id: string): StoredPgn | undefined => {
    return pgns.find(p => p.id === id);
  }, [pgns]);
  
  const deletePgn = useCallback((id: string) => {
    const updatedPgns = pgns.filter(p => p.id !== id);
    savePgns(updatedPgns);
  }, [pgns]);

  return { pgns, addPgn, getPgnById, deletePgn };
};