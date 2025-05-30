import { useQuery } from 'react-query';
import { Beach, BeachWithWeather } from '../types';
import { fetchWeatherData, determineSafetyStatus } from '../services/weatherService';

export const useWeatherData = (beach: Beach) => {
  return useQuery(
    ['weather', beach.id],
    async () => {
      const weather = await fetchWeatherData(
        beach.coordinates.lat,
        beach.coordinates.lon
      );
      
      const safetyStatus = determineSafetyStatus(weather);
      
      const beachWithWeather: BeachWithWeather = {
        ...beach,
        weather,
        safetyStatus,
        lastUpdated: new Date().toISOString(),
      };
      
      return beachWithWeather;
    },
    {
      staleTime: 1000 * 60 * 30, // 30 minutes
      cacheTime: 1000 * 60 * 60, // 1 hour
    }
  );
};