import { useState, useEffect } from "react";

const Weather = () => {
  const [selectedCity, setSelectedCity] = useState("Kathmandu"); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cities = ["Kathmandu", "Pokhara", "Biratnagar", "Mustang"]; // Dropdown options

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = `${import.meta.env.VITE_WEATHER_API_URL}/${city}/EN`;
      const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "open-weather13.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error}</p>;

  const { name, main, weather, wind, visibility } = weatherData || {};
  const { temp, temp_min, temp_max, humidity } = main || {};
  const condition = weather?.[0]?.description || "N/A";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="mb-4">
        <label htmlFor="city-select" className="mr-2 text-sm font-medium">
          Select City:
        </label>
        <select
          id="city-select"
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {weatherData && (
        <div className="flex flex-col bg-white rounded p-3 w-full max-w-xs shadow">
          <div className="font-bold text-lg">{name}</div>
          <div className="text-xs text-gray-500">
            {new Date().toDateString()}
          </div>
          <div className="mt-4 text-4xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-16 w-16">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              ></path>
            </svg>
          </div>
          <div className="flex flex-row items-center justify-center mt-4">
            <div className="font-medium text-4xl">{temp}°</div>
            <div className="flex flex-col items-center ml-4 text-sm">
              <div>{condition}</div>
              <div className="mt-1">
                <span>
                  <i className="far fa-long-arrow-up"></i>
                </span>
                <span className="font-light text-gray-500">{temp_max}°C</span>
              </div>
              <div>
                <span>
                  <i className="far fa-long-arrow-down"></i>
                </span>
                <span className="font-light text-gray-500">{temp_min}°C</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-4 text-xs">
            <div className="flex flex-col items-center">
              <div className="font-medium">Wind</div>
              <div className="text-gray-500">{wind?.speed} m/s</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-medium">Humidity</div>
              <div className="text-gray-500">{humidity}%</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-medium">Visibility</div>
              <div className="text-gray-500">{visibility / 1000} km</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
