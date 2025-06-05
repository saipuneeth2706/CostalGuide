import React, { useState } from 'react';
import { MapPin, Wind, Thermometer, ChevronDown, ChevronUp, Clock, X } from 'lucide-react';
import { BeachWithWeather } from '../types';
import { getWeatherIconUrl } from '../services/weatherService';
import SafetyBadge from './SafetyBadge';

interface BeachCardProps {
  beach: BeachWithWeather;
}

const BeachCard: React.FC<BeachCardProps> = ({ beach }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { weather, safetyStatus } = beach;
  
  const lastUpdatedTime = new Date(beach.lastUpdated).toLocaleTimeString();
  
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div 
        className="beach-card group animate-fade-in cursor-pointer hover:scale-[1.02] transition-transform duration-300"
        onClick={openModal}
      >
        {/* Card Preview */}
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
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900 truncate">{beach.name}</h3>
            <img 
              src={getWeatherIconUrl(weather.icon)} 
              alt={weather.condition}
              className="w-12 h-12 -mt-2 -mr-2"
            />
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
            <MapPin size={16} className="text-primary-500" />
            <span>{beach.location.city}, {beach.location.state}</span>
          </div>
          
          <p className="text-gray-700 text-sm line-clamp-2 mb-4">{beach.description}</p>
          
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
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl animate-scale-up">
            <div className="relative">
              <img 
                src={beach.imageUrl} 
                alt={beach.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <SafetyBadge status={safetyStatus} />
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{beach.name}</h2>
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <MapPin size={18} className="text-primary-500" />
                    <span>{beach.location.city}, {beach.location.state}</span>
                  </div>
                </div>
                <img 
                  src={getWeatherIconUrl(weather.icon)} 
                  alt={weather.condition}
                  className="w-16 h-16"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Current Conditions</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Thermometer size={20} className="text-accent-500" />
                    <div>
                      <div className="font-medium">{weather.temperature}°C</div>
                      <div className="text-sm text-gray-600">Temperature</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind size={20} className="text-primary-500" />
                    <div>
                      <div className="font-medium">{weather.windSpeed} km/h</div>
                      <div className="text-sm text-gray-600">Wind Speed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-medium">{weather.condition}</div>
                      <div className="text-sm text-gray-600">Condition</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-700">{beach.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Features & Activities</h3>
                <div className="flex flex-wrap gap-2">
                  {beach.features.map((feature, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock size={16} />
                <span>Last updated: {lastUpdatedTime}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BeachCard;