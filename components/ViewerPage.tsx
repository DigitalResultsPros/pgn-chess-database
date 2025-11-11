import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { usePgnStore } from '../hooks/usePgnStore';
import { parsePgn, getBoardAtMove, INITIAL_BOARD } from '../services/pgnService';
import Chessboard from './Chessboard';
import type { ParsedPgn, BoardState, PgnHeaders, MoveHighlight, Theme } from '../types';
import { THEMES, DEFAULT_THEME } from '../styles/themes';

const THEME_STORAGE_KEY = 'pgnChessTheme';

const getInitialTheme = (): Theme => {
  try {
    const savedThemeName = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedThemeName) {
      const foundTheme = THEMES.find(t => t.name === savedThemeName);
      if (foundTheme) return foundTheme;
    }
  } catch (error) {
    console.error("Could not load theme from localStorage", error);
  }
  return DEFAULT_THEME;
};


interface ViewerPageProps {
  pgnId: string;
}

const ViewerPage: React.FC<ViewerPageProps> = ({ pgnId }) => {
  const { getPgnById } = usePgnStore();
  const [game, setGame] = useState<ParsedPgn | null>(null);
  const [currentMove, setCurrentMove] = useState(-1);
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [highlight, setHighlight] = useState<MoveHighlight>(null);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  
  const pgnData = useMemo(() => getPgnById(pgnId), [pgnId, getPgnById]);

  useEffect(() => {
    if (pgnData) {
      const parsed = parsePgn(pgnData.pgnString);
      setGame(parsed);
      setCurrentMove(-1);
      setBoard(INITIAL_BOARD);
      setHighlight(null);
    }
  }, [pgnData]);

  useEffect(() => {
    if (game) {
      const { board: newBoard, highlight: newHighlight } = getBoardAtMove(game.moves, currentMove);
      setBoard(newBoard);
      setHighlight(newHighlight);
    }
  }, [currentMove, game]);
  
  const goTo = useCallback((moveIndex: number) => {
    if (game && moveIndex >= -1 && moveIndex < game.moves.length) {
      setCurrentMove(moveIndex);
    }
  }, [game]);

  const goToNext = useCallback(() => {
    if (game) {
      setCurrentMove(prev => Math.min(prev + 1, game.moves.length - 1));
    }
  }, [game]);

  const goToPrev = useCallback(() => {
    setCurrentMove(prev => Math.max(prev - 1, -1));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
          goToNext();
      } else if (e.key === 'ArrowLeft') {
          goToPrev();
      }
  }, [goToNext, goToPrev]);

  useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
          window.removeEventListener('keydown', handleKeyDown);
      };
  }, [handleKeyDown]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newThemeName = event.target.value;
    const newTheme = THEMES.find(t => t.name === newThemeName) || DEFAULT_THEME;
    setTheme(newTheme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, newTheme.name);
    } catch (error) {
      console.error("Could not save theme to localStorage", error);
    }
  };

  if (!game) {
    return <div className="text-center text-xl">Loading game or game data is invalid...</div>;
  }

  const goToStart = () => goTo(-1);
  const goToEnd = () => goTo(game.moves.length - 1);
  
  const movePairs = [];
  for (let i = 0; i < game.moves.length; i += 2) {
    movePairs.push({
      number: i / 2 + 1,
      white: game.moves[i],
      black: game.moves[i + 1] || '',
    });
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-8" style={{ height: 'calc(100vh - 8rem)' }}>
        {/* Left Column: Board and Controls */}
        <div className="flex flex-col flex-grow min-w-0">
            {/* Board container that grows and shrinks */}
            <div className="flex-grow min-h-0 flex items-center justify-center">
                <Chessboard boardState={board} highlight={highlight} theme={theme} />
            </div>
            {/* Controls container that does not shrink */}
            <div className="flex-shrink-0 mt-4 bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="flex justify-center items-center mb-3 text-white">
                    <span className="text-gray-400 mr-2">Move:</span>
                    <span className="font-mono text-lg">{currentMove < 0 ? 'Start' : currentMove + 1} / {game.moves.length}</span>
                </div>
                <div className="mb-4">
                  <input
                    type="range"
                    min={-1}
                    max={game.moves.length - 1}
                    value={currentMove}
                    onChange={(e) => goTo(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    aria-label="Game progress slider"
                  />
                </div>
                <div className="flex justify-center space-x-2">
                    <ControlButton onClick={goToStart}>&laquo;</ControlButton>
                    <ControlButton onClick={goToPrev}>&#8249;</ControlButton>
                    <ControlButton onClick={goToNext}>&#8250;</ControlButton>
                    <ControlButton onClick={goToEnd}>&raquo;</ControlButton>
                </div>
            </div>
        </div>
        
        {/* Right Column: Game Info and Moves */}
        <div className="flex-shrink-0 md:w-80 lg:w-96 bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col">
            <GameInfo headers={game.headers} />
            
            <div className="mt-4">
              <label htmlFor="theme-select" className="block text-sm font-medium text-gray-300 mb-1">Board Theme</label>
              <select 
                id="theme-select"
                value={theme.name} 
                onChange={handleThemeChange}
                className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {THEMES.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
              </select>
            </div>

            <h3 className="text-xl font-semibold mt-4 mb-2 border-b border-gray-700 pb-2">Moves</h3>
            <div className="flex-grow overflow-y-auto text-sm font-mono bg-gray-900/50 p-2 rounded">
                {movePairs.map((pair, index) => {
                    const whiteMoveIndex = index * 2;
                    const blackMoveIndex = index * 2 + 1;
                    return (
                        <div key={pair.number} className="flex items-center space-x-2 p-1 rounded">
                            <span className="text-gray-500 w-6 text-right">{pair.number}.</span>
                            <span data-move-index={whiteMoveIndex} onClick={() => goTo(whiteMoveIndex)} className={`px-2 py-1 rounded cursor-pointer ${currentMove === whiteMoveIndex ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}>{pair.white}</span>
                            {pair.black && <span data-move-index={blackMoveIndex} onClick={() => goTo(blackMoveIndex)} className={`px-2 py-1 rounded cursor-pointer ${currentMove === blackMoveIndex ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}>{pair.black}</span>}
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

const ControlButton: React.FC<{onClick: () => void; children: React.ReactNode}> = ({onClick, children}) => (
    <button onClick={onClick} className="px-4 py-2 bg-gray-700 hover:bg-blue-600 text-white font-bold rounded-md transition duration-200 text-xl w-16">
        {children}
    </button>
);

const GameInfo: React.FC<{headers: PgnHeaders}> = ({ headers }) => {
    const { White, Black, Event, Site, Date, Result } = headers;
    return (
        <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold text-center mb-2">{White} vs {Black}</h2>
            <div className="text-center text-gray-400 mb-4">{Result}</div>
            <div className="space-y-1 text-sm">
                <p><strong className="text-gray-300 w-16 inline-block">Event:</strong> {Event}</p>
                <p><strong className="text-gray-300 w-16 inline-block">Site:</strong> {Site}</p>
                <p><strong className="text-gray-300 w-16 inline-block">Date:</strong> {Date}</p>
            </div>
        </div>
    );
};

export default ViewerPage;