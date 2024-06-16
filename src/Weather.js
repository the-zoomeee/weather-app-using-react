import React, { useState, useEffect } from "react";
import "./Weather.css";

const apiKey = process.env.REACT_APP_API_KEY;

async function fetchWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  if (!response.ok) {
    throw new Error("Unable to fetch weather data");
  }
  const data = await response.json();
  return data;
}

async function fetchCityFromCoordinates(lat, lon) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );
  if (!response.ok) {
    throw new Error("Unable to fetch city from coordinates");
  }
  const data = await response.json();
  return data.address.city || data.address.town || data.address.village;
}

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Track dark mode state

  useEffect(() => {
    const getGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const defaultCity = await fetchCityFromCoordinates(latitude, longitude);
              setCity(defaultCity);
              const data = await fetchWeatherData(defaultCity);
              setWeatherData(data);
            } catch (error) {
              console.error(error);
            }
          },
          (error) => {
            console.error("Error getting geolocation", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getGeolocation();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (city.trim() !== "") {
      try {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
        setCity("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode state
  };

  const getWeatherIconName = (weatherCondition) => {
    const iconMap = {
      Clear: "wb_sunny",
      Clouds: "wb_cloudy",
      Rain: "umbrella",
      Thunderstorm: "flash_on",
      Drizzle: "grain",
      Snow: "ac_unit",
      Mist: "cloud",
      Smoke: "cloud",
      Haze: "cloud",
      Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help";
  };

  const currentDate = new Date().toDateString();

  return (
    <div className={`weather-app ${darkMode ? 'dark-mode' : 'light-mode'}`} >
      <div className="mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? (
          <i className="material-icons">wb_sunny</i> // Light mode icon
        ) : (
          <i className="material-icons">nights_stay</i> // Dark mode icon
        )}
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="city-input"
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-btn" type="submit">
          <i className="material-icons">search</i>
        </button>
      </form>

      {weatherData && (
        <>
          <div className="city-date-section">
            <h2 className="city">{weatherData.name}</h2>
            <p className="date">{currentDate}</p>
          </div>

          <div className="temperature-info">
            <div className="description">
              <i className="material-icons">
                {getWeatherIconName(weatherData.weather[0].main)}
              </i>
              <span className="description-text">
                {weatherData.weather[0].description}
              </span>
            </div>
            <div className="temp">{Math.round(weatherData.main.temp)}°C</div>
          </div>

          <div className="additional-info">
            <div className="wind-info">
              <i className="material-icons">air</i>
              <div>
                <h3 className="wind-speed">{weatherData.wind.speed} km/h</h3>
                <p className="wind-label">Wind</p>
              </div>
            </div>
            <div className="humidity-info">
              <i className="material-icons">water_drop</i>
              <div>
                <h3 className="humidity">{weatherData.main.humidity}%</h3>
                <p className="humidity-label">Humidity</p>
              </div>
            </div>
            <div className="visibility-info">
              <i className="material-icons">visibility</i>
              <div>
                <h3 className="visibility-distance">
                  {(weatherData.visibility / 1000).toFixed(1)} km
                </h3>
                <p className="visibility-label">Visibility</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
