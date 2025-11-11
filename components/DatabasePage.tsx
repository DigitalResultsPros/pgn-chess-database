
import React, { useState } from 'react';
import { usePgnStore } from '../hooks/usePgnStore';
import type { StoredPgn } from '../types';

interface DatabasePageProps {
  onViewPgn: (pgnId: string) => void;
}

const DatabasePage: React.FC<DatabasePageProps> = ({ onViewPgn }) => {
  const { pgns, addPgn, deletePgn } = usePgnStore();
  const [newPgnContent, setNewPgnContent] = useState('');
  const [error, setError] = useState('');

  const handleAddPgn = () => {
    if (!newPgnContent.trim()) {
      setError('PGN content cannot be empty.');
      return;
    }
    const result = addPgn(newPgnContent);
    if (result) {
      setNewPgnContent('');
      setError('');
    } else {
      setError('Invalid PGN format. Ensure White and Black headers are present.');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">PGN Database</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Saved Games</h2>
          {pgns.length === 0 ? (
            <p className="text-gray-400">No games found. Add one using the form.</p>
          ) : (
            <div className="space-y-4">
              {pgns.map((pgn) => (
                <PgnCard key={pgn.id} pgn={pgn} onViewPgn={onViewPgn} onDeletePgn={deletePgn} />
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Game</h2>
            <textarea
              value={newPgnContent}
              onChange={(e) => setNewPgnContent(e.target.value)}
              placeholder="Paste PGN content here..."
              className="w-full h-64 bg-gray-900 text-gray-200 p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none"
            ></textarea>
            {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
            <button
              onClick={handleAddPgn}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300"
            >
              Save Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PgnCardProps {
  pgn: StoredPgn;
  onViewPgn: (pgnId: string) => void;
  onDeletePgn: (pgnId: string) => void;
}

const PgnCard: React.FC<PgnCardProps> = ({ pgn, onViewPgn, onDeletePgn }) => {
  const { White, Black, Event, Date, Result } = pgn.headers;
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this game?')) {
        onDeletePgn(pgn.id);
    }
  };

  return (
    <div
      onClick={() => onViewPgn(pgn.id)}
      className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700/50 cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-500"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-white">
            {White || 'N/A'} vs {Black || 'N/A'}
          </h3>
          <p className="text-sm text-gray-400">
            {Event || 'Unknown Event'} - {Date || 'Unknown Date'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
            {Result && <span className="text-lg font-mono bg-gray-700 px-3 py-1 rounded">{Result}</span>}
            <button
                onClick={handleDelete}
                className="text-gray-500 hover:text-red-400 transition-colors p-1 rounded-full"
                aria-label="Delete game"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default DatabasePage;
