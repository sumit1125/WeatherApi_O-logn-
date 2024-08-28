// pages/api/weather.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_KEY = process.env.WEATHER_API_KEY; // Ensure you have this in your .env.local file



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { localityId } = req.query;

  if (!localityId || typeof localityId !== 'string') {
    return res.status(400).json({ error: 'Invalid locality ID' });
  }

  try {
    const response = await axios.get(
      `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data`,
      {
        params: {
          locality_id: localityId,
          // apiKey: API_KEY,

        },
        headers: {
          "x-zomato-api-key": API_KEY
        }
      }
    );
    const data = await response.data;

    console.log("data", data);

    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

export default handler;
