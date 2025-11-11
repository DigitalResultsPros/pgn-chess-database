import * as lodash from 'lodash';
import { Chess } from 'chess.js';
import type { ParsedPgn, BoardState, PgnHeaders, Piece, MoveHighlight } from '../types';

// The initial board state, used for the default view before any moves are made.
export const INITIAL_BOARD: BoardState = [
  ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
  ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
  ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
];

/**
 * Parses a PGN string using the chess.js library for robustness.
 * @param pgnString The raw PGN text.
 * @returns A ParsedPgn object with headers and moves, or null if parsing fails.
 */
export function parsePgn(pgnString: string): ParsedPgn | null {
  if (!pgnString) return null;
  try {
    const chess = new Chess();
    chess.loadPgn(pgnString);
    const headersRaw = chess.header();
    const headers: PgnHeaders = {};
    // Convert headers object to the expected PgnHeaders type
    for (const key in headersRaw) {
      headers[key] = String(headersRaw[key]);
    }
    const moves = chess.history();

    // Basic validation to ensure it's a real game
    if (Object.keys(headers).length === 0 && moves.length === 0) {
      return null;
    }

    return { headers, moves };
  } catch (e) {
    console.error("Failed to parse PGN string with chess.js:", e);
    return null;
  }
}

/**
 * Helper to convert algebraic notation (e.g., 'e4') to board coordinates [row, col].
 */
function algebraicToCoords(square: string): [number, number] {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
  const rank = 8 - parseInt(square.charAt(1), 10);
  return [rank, file];
}

/**
 * Generates the board state at a specific move index by replaying the game from the start.
 * This ensures the board is always 100% accurate according to chess rules.
 * @param moves An array of moves in Standard Algebraic Notation (SAN).
 * @param moveIndex The index of the move to display (-1 for the starting position).
 * @returns An object containing the board state and the highlight for the current move.
 */
export function getBoardAtMove(moves: string[], moveIndex: number): { board: BoardState, highlight: MoveHighlight } {
  // Return the starting position for index -1.
  if (moveIndex < 0) {
    return { board: lodash.cloneDeep(INITIAL_BOARD), highlight: null };
  }

  const chess = new Chess();
  let lastSuccessfulMove: any = null;

  // Replay the game from the beginning to the desired move
  for (let i = 0; i <= moveIndex; i++) {
    if (i >= moves.length) break;
    try {
      lastSuccessfulMove = chess.move(moves[i]);
    } catch (e) {
      console.error(`Invalid move in sequence: "${moves[i]}" at index ${i}. Board state will be as of the last valid move.`);
      // Stop processing on an invalid move to prevent a crash or incorrect board state
      break;
    }
  }

  // Convert the board from chess.js format to our application's format
  const boardFromEngine = chess.board();
  const finalBoardState: BoardState = boardFromEngine.map(row =>
    row.map(p => p ? `${p.color}${p.type.toUpperCase()}` as Piece : null)
  );

  // Create the highlight based on the 'from' and 'to' of the last successful move
  let highlight: MoveHighlight = null;
  if (lastSuccessfulMove) {
    highlight = {
      from: algebraicToCoords(lastSuccessfulMove.from),
      to: algebraicToCoords(lastSuccessfulMove.to),
    };
  }

  return { board: finalBoardState, highlight };
}