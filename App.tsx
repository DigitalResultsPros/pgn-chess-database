
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DatabasePage from './components/DatabasePage';
import ViewerPage from './components/ViewerPage';

export type Page = 'landing' | 'database' | 'viewer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedPgnId, setSelectedPgnId] = useState<string | null>(null);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const viewPgn = useCallback((pgnId: string) => {
    setSelectedPgnId(pgnId);
    setCurrentPage('viewer');
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'database':
        return <DatabasePage onViewPgn={viewPgn} />;
      case 'viewer':
        return selectedPgnId ? <ViewerPage pgnId={selectedPgnId} /> : <LandingPage onNavigate={navigateTo} />;
      case 'landing':
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header onNavigate={navigateTo} />
      <main className="p-4 sm:p-6 md:p-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
