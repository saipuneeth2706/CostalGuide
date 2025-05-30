import React from 'react';
import { useBeachData } from '../contexts/BeachDataContext';
import BeachCard from './BeachCard';
import LoadingState from './LoadingState';
import NoResults from './NoResults';

const BeachList: React.FC = () => {
  const { filteredBeaches, isLoading, error } = useBeachData();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Beaches</h2>
        <p className="text-gray-600">{error.message}</p>
        <p className="mt-4">Please try refreshing the page or check your connection.</p>
      </div>
    );
  }

  if (filteredBeaches.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">
        {filteredBeaches.length} Beaches Found
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeaches.map((beach) => (
          <BeachCard key={beach.id} beach={beach} />
        ))}
      </div>
    </div>
  );
};

export default BeachList;