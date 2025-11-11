import React from 'react';
import type { Piece } from '../../types';

interface ChessPieceProps {
  piece: Piece;
  size: number;
}

export const ChessPiece: React.FC<ChessPieceProps> = ({ piece, size }) => {
  const isWhite = piece[0] === 'w';
  const pieceSymbol = piece.substring(1).toUpperCase();

  const unicodeMap: { [key: string]: { w: string; b: string } } = {
    'K': { w: '♔', b: '♚' },
    'Q': { w: '♕', b: '♛' },
    'R': { w: '♖', b: '♜' },
    'B': { w: '♗', b: '♝' },
    'N': { w: '♘', b: '♞' },
    'P': { w: '♙', b: '♟' },
  };
  
  const isBlackPawn = pieceSymbol === 'P' && !isWhite;

  // For black pawns, use the white (outline) glyph. We will make it solid via styling.
  // This avoids using the inconsistent `♟` glyph found in many fonts.
  const pieceChar = isBlackPawn
    ? unicodeMap[pieceSymbol].w
    // Fallback to empty string if symbol is not found.
    : unicodeMap[pieceSymbol]?.[isWhite ? 'w' : 'b'] || '';

  const colorClass = isWhite ? 'text-white' : 'text-black';
  const shadowClass = isWhite ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]' : 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]';
  
  // Apply a heavy font-weight to the black pawn. This makes the outline glyph
  // thick enough to appear solid, matching the style of the other black pieces.
  const pawnStyleFix = isBlackPawn ? 'font-black' : '';

  // Use a sensible ratio of the square size for the font size.
  // Provide a fallback for the initial render before the size is calculated.
  const dynamicFontSize = size > 0 ? `${size * 0.75}px` : '7.5vh';

  return (
    <span
      className={`leading-none select-none cursor-pointer ${colorClass} ${shadowClass} ${pawnStyleFix}`}
      style={{ fontSize: dynamicFontSize }}
      aria-hidden="true"
    >
      {pieceChar}
    </span>
  );
};