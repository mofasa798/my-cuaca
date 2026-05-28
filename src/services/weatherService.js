import config from '../config/index.js';
import HttpError from '../utils/httpError.js';
import cache from '../utils/cache.js';

const CURRENT_URL = 'http://api.weatherapi.com/v1/current.json';
const FORECAST_URL = 'http://api.weatherapi.com/v1/forecast.json';

export async function getWeatherByCity(city) {
  const cacheKey = `weather:${city}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const url = `${CURRENT_URL}?key=${config.weatherApiKey}&q=${encodeURIComponent(city)}&aqi=no`;

  const response = await fetch(url);

  if (!response.ok) {
    const message = `Gagal memanggil API cuaca: ${response.statusText}`;
    throw new HttpError(response.status, message);
  }

  const data = await response.json();

  const result = {
    city: data.location.name,
    country: data.location.country,
    temperature_c: data.current.temp_c,
    condition: data.current.condition.text,
    wind_kph: data.current.wind_kph,
    humidity: data.current.humidity,
  };

  cache.set(cacheKey, result, 600000); // cache 10 menit
  return result;
}

export async function getWeatherForecast(city, days = 3) {
  const cacheKey = `forecast:${city}:${days}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const url = `${FORECAST_URL}?key=${config.weatherApiKey}&q=${encodeURIComponent(city)}&days=${days}&aqi=no`;

  const response = await fetch(url);

  if (!response.ok) {
    const message = `Gagal memanggil API forecast: ${response.statusText}`;
    throw new HttpError(response.status, message);
  }

  const data = await response.json();

  const result = {
    city: data.location.name,
    country: data.location.country,
    forecast: data.forecast.forecastday.map((day) => ({
      date: day.date,
      max_temp_c: day.day.maxtemp_c,
      min_temp_c: day.day.mintemp_c,
      avg_temp_c: day.day.avgtemp_c,
      condition: day.day.condition.text,
      chance_of_rain: day.day.daily_chance_of_rain,
    })),
  };

  cache.set(cacheKey, result, 1800000); // cache 30 menit
  return result;
}
