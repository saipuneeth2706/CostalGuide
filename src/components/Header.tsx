import React from 'react';
import { WavesIcon, RefreshCw } from 'lucide-react';
import { useBeachData } from '../contexts/BeachDataContext';
import SearchFilters from './SearchFilters';

const Header: React.FC = () => {
  const { refreshAll, isLoading } = useBeachData();

  return (
    <header className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md">
      <div className="container mx-auto max-w-7xl px-4 py-6 md:px-8">
        <div className="flex flex-col gap-6">
          {/* Logo and Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <WavesIcon size={32} className="text-white" />
              <h1 className="text-2xl md:text-3xl font-bold">India Beach Safety</h1>
            </div>
            
            <button
              onClick={refreshAll}
              disabled={isLoading}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
              aria-label="Refresh weather data"
            >
              <RefreshCw size={18} className={`${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
          </div>
          
          {/* Search Filters */}
          <SearchFilters />
        </div>
      </div>
    </header>
  );
};

export default Header;