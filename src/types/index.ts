export interface Beach {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
  };
  description: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  features: string[];
}

export interface Weather {
  temperature: number;
  condition: string;
  windSpeed: number;
  icon: string;
}

export interface BeachWithWeather extends Beach {
  weather: Weather;
  safetyStatus: SafetyStatus;
  lastUpdated: string;
}

export type SafetyStatus = 'safe' | 'caution' | 'unsafe';

export interface SearchFilters {
  query: string;
  safetyStatus: SafetyStatus | 'all';
  state: string;
}