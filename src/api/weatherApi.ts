import axios from "axios";

const API_KEY = "6bb31cc8cf3e4e1e813103253240506";
const BASE_URL = "https://api.weatherapi.com/v1";

export const getWeatherData = async (location: string, timeframe = "daily") => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: location,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getWeatherForecast = async (
  location: string,
  timeframe = "daily"
) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: location,
        days: timeframe === "daily" ? 1 : timeframe === "weekly" ? 7 : 30,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
