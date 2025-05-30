import axios from 'axios';
import { Weather, SafetyStatus } from '../types';

const API_KEY = '837c7c18fda95758404ebc7d54ef0d11';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (lat: number, lon: number): Promise<Weather> => {
  const response = await axios.get(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  return {
    temperature: Math.round(response.data.main.temp),
    condition: response.data.weather[0].main,
    windSpeed: Math.round(response.data.wind.speed * 3.6), // Convert m/s to km/h
    icon: response.data.weather[0].icon,
  };
};

export const determineSafetyStatus = (weather: Weather): SafetyStatus => {
  if (
    weather.condition === 'Thunderstorm' ||
    weather.windSpeed > 20 ||
    weather.condition === 'Hurricane'
  ) {
    return 'unsafe';
  } else if (
    weather.condition === 'Rain' ||
    weather.windSpeed > 15 ||
    weather.condition === 'Drizzle'
  ) {
    return 'caution';
  } else {
    return 'safe';
  }
};

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};