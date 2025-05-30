import React from 'react';
import { Search } from 'lucide-react';
import { useBeachData } from '../contexts/BeachDataContext';
import { SafetyStatus } from '../types';

const SearchFilters: React.FC = () => {
  const { filters, setFilters, uniqueStates } = useBeachData();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, query: e.target.value }));
  };

  const handleSafetyFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ 
      ...prev, 
      safetyStatus: e.target.value as SafetyStatus | 'all'
    }));
  };

  const handleStateFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, state: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end">
      {/* Search bar */}
      <div className="flex-grow">
        <label htmlFor="search" className="block text-sm font-medium text-white mb-1">
          Search Beaches
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            id="search"
            type="text"
            value={filters.query}
            onChange={handleSearchChange}
            placeholder="Search by beach name or city..."
            className="search-input pl-10 bg-white/90 text-gray-800 w-full"
          />
        </div>
      </div>

      {/* Safety status filter */}
      <div className="w-full md:w-48">
        <label htmlFor="safety-filter" className="block text-sm font-medium text-white mb-1">
          Safety Status
        </label>
        <select
          id="safety-filter"
          value={filters.safetyStatus}
          onChange={handleSafetyFilterChange}
          className="search-input bg-white/90 text-gray-800 w-full"
        >
          <option value="all">All Statuses</option>
          <option value="safe">Safe</option>
          <option value="caution">Caution</option>
          <option value="unsafe">Unsafe</option>
        </select>
      </div>

      {/* State filter */}
      <div className="w-full md:w-48">
        <label htmlFor="state-filter" className="block text-sm font-medium text-white mb-1">
          State
        </label>
        <select
          id="state-filter"
          value={filters.state}
          onChange={handleStateFilterChange}
          className="search-input bg-white/90 text-gray-800 w-full"
        >
          <option value="">All States</option>
          {uniqueStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;