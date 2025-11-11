
import React from 'react';
import type { Page } from '../App';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="text-center py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          Your Personal Chess Game <span className="text-blue-500">Database</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400">
          Store, analyze, and replay your favorite chess games. The perfect tool for students of the game.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => onNavigate('database')}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
          >
            Go to Database
          </button>
          <button
            onClick={() => onNavigate('database')}
            className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300"
          >
            Add New Game
          </button>
        </div>
        <div className="mt-20 opacity-30">
          <div className="text-6xl" style={{ fontFamily: 'monospace' }}>
            ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
