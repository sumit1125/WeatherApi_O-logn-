import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';

interface IWeather {
  status: string;
  message: string;
  device_type: number;
  locality_weather_data: {
    temperature: number;
    humidity: number;
    wind_speed: number | null;
    wind_direction: number;
    rain_intensity: number;
    rain_accumulation: number;
  };
}

const WeatherPage = () => {
  const router = useRouter();
  const { localityId } = router.query;
  const [weatherData, setWeatherData] = useState<IWeather | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (localityId) {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(`/api/weather`, {
            params: { localityId },
          });

          const data = response.data;
          console.log("response", data);

          setWeatherData(data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError(error.response?.data?.error || error.message);
          } else {
            setError('An unexpected error occurred');
          }
        }
      };
      fetchWeatherData();
    }
  }, [localityId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Weather Information</h1>
      <p>Temperature: {weatherData.locality_weather_data.temperature}°C</p>
      <p>Humidity: {weatherData.locality_weather_data.humidity}%</p>
      <p>Wind Speed: {weatherData.locality_weather_data.wind_speed !== null ? weatherData.locality_weather_data.wind_speed : 'N/A'}</p>
      <p>Wind Direction: {weatherData.locality_weather_data.wind_direction}°</p>
      <p>Rain Intensity: {weatherData.locality_weather_data.rain_intensity}</p>
      <p>Rain Accumulation: {weatherData.locality_weather_data.rain_accumulation} mm</p>
      {/* Display other relevant weather data */}
    </div>
  );
};

export default WeatherPage;
