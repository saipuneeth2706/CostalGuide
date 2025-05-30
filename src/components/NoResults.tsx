import React from 'react';
import { SearchX } from 'lucide-react';
import { useBeachData } from '../contexts/BeachDataContext';

const NoResults: React.FC = () => {
  const { setFilters } = useBeachData();

  const resetFilters = () => {
    setFilters({
      query: '',
      safetyStatus: 'all',
      state: '',
    });
  };

  return (
    <div className="container mx-auto max-w-7xl py-12 text-center">
      <div className="flex justify-center mb-4">
        <SearchX size={64} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Beaches Found</h2>
      <p className="text-gray-600 mb-6">
        No beaches match your current search criteria. Try adjusting your filters.
      </p>
      <button
        onClick={resetFilters}
        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default NoResults;