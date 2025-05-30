import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { beaches } from '../data/beaches';
import { Beach, BeachWithWeather, SearchFilters } from '../types';
import { fetchWeatherData, determineSafetyStatus } from '../services/weatherService';

interface BeachDataContextType {
  beachesWithWeather: BeachWithWeather[];
  isLoading: boolean;
  error: Error | null;
  refreshAll: () => void;
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  filteredBeaches: BeachWithWeather[];
  uniqueStates: string[];
}

const BeachDataContext = createContext<BeachDataContextType | undefined>(undefined);

export const BeachDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [beachesWithWeather, setBeachesWithWeather] = useState<BeachWithWeather[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    safetyStatus: 'all',
    state: '',
  });

  // Initialize uniqueStates
  const uniqueStates = Array.from(new Set(beaches.map(beach => beach.location.state))).sort();

  // Load all beach weather data
  useEffect(() => {
    const fetchAllBeachesWeather = async () => {
      try {
        setIsLoading(true);
        const beachesData = await Promise.all(
          beaches.map(async (beach) => {
            try {
              const weatherData = await queryClient.fetchQuery(['weather', beach.id], async () => {
                const weather = await fetchWeatherData(
                  beach.coordinates.lat,
                  beach.coordinates.lon
                );
                const safetyStatus = determineSafetyStatus(weather);
                return {
                  ...beach,
                  weather,
                  safetyStatus,
                  lastUpdated: new Date().toISOString(),
                };
              });
              return weatherData;
            } catch (err) {
              console.error(`Error fetching weather for ${beach.name}:`, err);
              return null;
            }
          })
        );
        
        const validBeachesData = beachesData.filter(
          (beach): beach is BeachWithWeather => beach !== null && beach !== undefined
        );
        
        setBeachesWithWeather(validBeachesData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setIsLoading(false);
      }
    };

    fetchAllBeachesWeather();
  }, [queryClient]);

  // Refresh all beach data
  const refreshAll = () => {
    setIsLoading(true);
    queryClient.invalidateQueries(['weather']);
    
    const refreshBeaches = async () => {
      const refreshedData = await Promise.all(
        beaches.map(async (beach) => {
          try {
            const weatherData = await queryClient.fetchQuery(['weather', beach.id], async () => {
              const weather = await fetchWeatherData(
                beach.coordinates.lat,
                beach.coordinates.lon
              );
              const safetyStatus = determineSafetyStatus(weather);
              return {
                ...beach,
                weather,
                safetyStatus,
                lastUpdated: new Date().toISOString(),
              };
            });
            return weatherData;
          } catch (err) {
            console.error(`Error refreshing weather for ${beach.name}:`, err);
            return null;
          }
        })
      );
      
      const validRefreshedData = refreshedData.filter(
        (beach): beach is BeachWithWeather => beach !== null && beach !== undefined
      );
      
      setBeachesWithWeather(validRefreshedData);
      setIsLoading(false);
    };

    refreshBeaches();
  };

  // Apply filters
  const filteredBeaches = beachesWithWeather.filter(beach => {
    // Filter by search query (beach name or city)
    const matchesQuery = 
      filters.query === '' || 
      beach.name.toLowerCase().includes(filters.query.toLowerCase()) ||
      beach.location.city.toLowerCase().includes(filters.query.toLowerCase());
    
    // Filter by safety status
    const matchesSafetyStatus = 
      filters.safetyStatus === 'all' || 
      beach.safetyStatus === filters.safetyStatus;
    
    // Filter by state
    const matchesState = 
      filters.state === '' || 
      beach.location.state === filters.state;
    
    return matchesQuery && matchesSafetyStatus && matchesState;
  });

  const contextValue = {
    beachesWithWeather,
    isLoading,
    error,
    refreshAll,
    filters,
    setFilters,
    filteredBeaches,
    uniqueStates,
  };

  return (
    <BeachDataContext.Provider value={contextValue}>
      {children}
    </BeachDataContext.Provider>
  );
};

export const useBeachData = () => {
  const context = useContext(BeachDataContext);
  if (context === undefined) {
    throw new Error('useBeachData must be used within a BeachDataProvider');
  }
  return context;
};