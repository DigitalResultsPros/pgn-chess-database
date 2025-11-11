
import React from 'react';
import type { Page } from '../App';

interface HeaderProps {
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
      <nav className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('landing')} className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6zM20 12h-2v-2h2v2zm0 4h-2v-2h2v2zm-4.04-10.7L12 5.51 7.96 1.3 5.3 3.96l4.21 4.21-4.21 4.21 2.66 2.66L12 11.23l4.04 4.19 2.66-2.66-4.21-4.21 4.21-4.21z" opacity=".3"/><path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 4c.61 0 1.17.26 1.59.68L18 9.09l-4.21 4.21-2.66-2.66L7.96 7.47 12 3.26V4zm0 2.49L7.96 10.7 5.3 8.04l4.21-4.21L12 6.49zm0 8.02L16.04 10.7l2.66 2.66-4.21 4.21L12 14.51zm-4.04-3.81L12 14.73v.78l-4.21-4.21 2.66-2.66zM8 7h2v6H8V7zm4 0h2v6h-2V7zm4 0h2v2h-2V7zm0 4h2v2h-2v-2zm-4 4h2v2h-2v-2zM8 15h2v2H8v-2z"/>
              </svg>
              <span className="text-xl font-bold">PGN Chess</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('landing')} className="text-gray-300 hover:text-white transition-colors duration-200">Home</button>
            <button onClick={() => onNavigate('database')} className="text-gray-300 hover:text-white transition-colors duration-200">Database</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
