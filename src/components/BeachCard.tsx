import React from 'react';
import { MapPin, Wind, Thermometer } from 'lucide-react';
import { BeachWithWeather } from '../types';
import { getWeatherIconUrl } from '../services/weatherService';
import SafetyBadge from './SafetyBadge';

interface BeachCardProps {
  beach: BeachWithWeather;
}

const BeachCard: React.FC<BeachCardProps> = ({ beach }) => {
  const { weather, safetyStatus } = beach;
  
  return (
    <div className="beach-card group animate-fade-in">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={beach.imageUrl} 
          alt={beach.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <SafetyBadge status={safetyStatus} />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 truncate">{beach.name}</h3>
          
          {/* Weather icon */}
          <img 
            src={getWeatherIconUrl(weather.icon)} 
            alt={weather.condition}
            className="w-12 h-12 -mt-2 -mr-2"
          />
        </div>
        
        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <MapPin size={16} className="text-primary-500" />
          <span>{beach.location.city}, {beach.location.state}</span>
        </div>
        
        {/* Description */}
        <p className="text-gray-700 mb-4 text-sm line-clamp-2">{beach.description}</p>
        
        {/* Weather data */}
        <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Thermometer size={16} className="text-accent-500" />
            <span className="text-sm font-medium">{weather.temperature}°C</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind size={16} className="text-primary-500" />
            <span className="text-sm font-medium">{weather.windSpeed} km/h</span>
          </div>
          <div className="text-sm font-medium ml-auto">{weather.condition}</div>
        </div>
        
        {/* Features */}
        <div className="mt-4 flex flex-wrap gap-2">
          {beach.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              {feature}
            </span>
          ))}
          {beach.features.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              +{beach.features.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeachCard;