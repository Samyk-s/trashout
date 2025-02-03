import { useState, useEffect } from "react";

const Weather = () => {
  const [selectedCity, setSelectedCity] = useState("sunnyvale"); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // List of cities to select from
  const cities = ["sunnyvale", "London", "Kathmandu", "Pokhara", "Biratnagar", "Mustang"];

  // Fetch weather data based on the selected city
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`; // Fixed URL

      // Make the fetch request
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
          "x-rapidapi-key": "4072bac47bmsh0c12ac58a5f681fp12b399jsn08dd165c22a7",
          "Accept": "application/json",
        },
      });

      // Handle non-OK responses
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }

      const data = await response.json();
      setWeatherData(data); // Store the weather data in state
    } catch (err) {
      setError(err.message); // Handle any errors
    } finally {
      setLoading(false); // Turn off the loading state
    }
  };

  // Run the fetchWeather function when the selected city changes
  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  // Show loading state while the data is being fetched
  if (loading) return <p>Loading weather data...</p>;

  // Show error message if something went wrong
  if (error) return <p>Error: {error}</p>;

  // Extract weather data for display
  const { location, current_observation } = weatherData || {};
  const { temperature, humidity, wind, visibility, condition } = current_observation || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* City selection dropdown */}
      <div className="mb-4">
        <label htmlFor="city-select" className="mr-2 text-sm font-medium">
          Select City:
        </label>
        <select
          id="city-select"
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)} // Update the selected city
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Weather data display */}
      {weatherData && (
        <div className="flex flex-col bg-white rounded p-3 w-full max-w-xs shadow">
          <div className="font-bold text-lg">{location?.city}</div>
          <div className="text-xs text-gray-500">{new Date().toDateString()}</div>

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
            <div className="font-medium text-4xl">{temperature?.fahrenheit}°F</div>
            <div className="flex flex-col items-center ml-4 text-sm">
              <div>{condition?.text}</div>
              <div className="mt-1">
                <span>
                  <i className="far fa-long-arrow-up"></i>
                </span>
                <span className="font-light text-gray-500">{temperature?.high}°F</span>
              </div>
              <div>
                <span>
                  <i className="far fa-long-arrow-down"></i>
                </span>
                <span className="font-light text-gray-500">{temperature?.low}°F</span>
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
