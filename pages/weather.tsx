// pages/weather.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// {
//   status: '200',
//   message: '',
//   device_type: 1,
//   locality_weather_data: {
//     temperature: 29.12,
//     humidity: 81.32,
//     wind_speed: null,
//     wind_direction: 0,
//     rain_intensity: 0,
//     rain_accumulation: 22.6
//   }
// }

interface IWeather {
  status: string;
  message: string;
  device_type: number;
  locality_weather_data: {
    temperature: number;
    humidity: number;
    wind_speed: null;
    wind_direction: number;
    rain_intensity: number;
    rain_accumultaion: number;
  }
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

          setWeatherData(response.data);
        } catch (error) {
          setError(error.response?.data?.error || error.message);
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
      {/* <h1 className="text-xl font-bold">Weather Information for {weatherData.locality_weather_data.}</h1> */}
      <p>Temperature: {weatherData.locality_weather_data.temperature}°C</p>
      <p>Humidity: {weatherData.locality_weather_data.humidity}%</p>
      <p>Condition: {weatherData.locality_weather_data.wind_speed}</p>
      <p>Condition: {weatherData.locality_weather_data.wind_direction}</p>
      <p>Condition: {weatherData.locality_weather_data.rain_intensity}</p>
      <p>Condition: {weatherData.locality_weather_data.rain_accumultaion}</p>
      {/* Display other relevant weather data */}
    </div>
  );
};

export default WeatherPage;
