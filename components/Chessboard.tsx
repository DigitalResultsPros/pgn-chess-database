import React, { useRef, useState, useEffect } from 'react';
import type { BoardState, MoveHighlight, Square as SquareType, Theme } from '../types';
import { ChessPiece } from './icons/ChessPiece';

interface ChessboardProps {
  boardState: BoardState;
  highlight: MoveHighlight;
  theme: Theme;
}

const Chessboard: React.FC<ChessboardProps> = ({ boardState, highlight, theme }) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [squareSize, setSquareSize] = useState(0);

  useEffect(() => {
    const boardElement = boardRef.current;
    if (!boardElement) return;

    // This ResizeObserver will update the square size whenever the board's dimensions change.
    // It's more efficient than a window resize event listener.
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width } = entries[0].contentRect;
        setSquareSize(width / 8);
      }
    });

    resizeObserver.observe(boardElement);

    // Clean up the observer when the component unmounts.
    return () => {
      if (boardElement) {
        resizeObserver.unobserve(boardElement);
      }
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  const isHighlighted = (row: number, col: number) => {
    if (!highlight) return false;
    const { from, to } = highlight;
    return (from[0] === row && from[1] === col) || (to[0] === row && to[1] === col);
  };

  return (
    <div 
      ref={boardRef} 
      className="aspect-square w-full max-w-full max-h-full shadow-2xl rounded-md overflow-hidden border-4 border-gray-700"
    >
      <div className="grid grid-cols-8 grid-rows-8 h-full">
        {boardState.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              isLight={(rowIndex + colIndex) % 2 !== 0}
              isHighlighted={isHighlighted(rowIndex, colIndex)}
              rowIndex={rowIndex}
              colIndex={colIndex}
              theme={theme}
              size={squareSize}
            />
          ))
        )}
      </div>
    </div>
  );
};

interface SquareProps {
  piece: SquareType;
  isLight: boolean;
  isHighlighted: boolean;
  rowIndex: number;
  colIndex: number;
  theme: Theme;
  size: number;
}

const Square: React.FC<SquareProps> = ({ piece, isLight, isHighlighted, rowIndex, colIndex, theme, size }) => {
  const bgColor = isLight ? theme.light : theme.dark;
  const textColor = isLight ? theme.lightText : theme.darkText;

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      {isHighlighted && <div className="absolute inset-0 bg-yellow-400/60 pointer-events-none" />}
      {piece && <ChessPiece piece={piece} size={size} />}
      {colIndex === 0 && (
         <span 
          className="absolute top-0 left-1 text-xs font-bold"
          style={{ color: textColor }}
        >
           {8 - rowIndex}
         </span>
       )}
       {rowIndex === 7 && (
         <span 
          className="absolute bottom-0 right-1 text-xs font-bold"
          style={{ color: textColor }}
         >
           {String.fromCharCode('a'.charCodeAt(0) + colIndex)}
         </span>
       )}
    </div>
  );
};

export default Chessboard;