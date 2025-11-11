// FIX: Removed self-import which was causing declaration conflicts.
// The file was trying to import types that it was also exporting.

export type PieceSymbol = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type PieceColor = 'w' | 'b';
export type Piece = `${PieceColor}${Uppercase<PieceSymbol>}`;

export type Square = Piece | null;
export type BoardState = Square[][];

export interface PgnHeaders {
  [key:string]: string;
}

export interface PgnMove {
  moveNumber: number;
  white: string;
  black?: string;
}

export interface ParsedPgn {
  headers: PgnHeaders;
  moves: string[];
}

export interface StoredPgn {
  id: string;
  pgnString: string;
  headers: PgnHeaders;
}

export type MoveHighlight = { from: [number, number]; to: [number, number]; } | null;

export interface Theme {
  name: string;
  light: string;
  dark: string;
  lightText: string;
  darkText: string;
}