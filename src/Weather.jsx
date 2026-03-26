import { useEffect, useState } from "react";
import "./weather.css";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  const apiKey = "237d28c3e848908b4d8228b3ed1728e0";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      fetchWeather(
        pos.coords.latitude,
        pos.coords.longitude
      );
    });
  }, []);

  const fetchWeather = async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    const data = await res.json();
    setWeather(data);
  };

  const searchWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = await res.json();
    setWeather(data);
  };

  const getIcon = () => {
    if (!weather) return "";

    const main = weather.weather[0].main;

    if (main === "Clouds") return "☁️";
    if (main === "Rain") return "🌧️";
    if (main === "Clear") return "☀️";
    if (main === "Snow") return "❄️";
    if (main === "Thunderstorm") return "⛈️";

    return "🌤️";
  };

  return (
  <div className={`app ${weather?.weather[0].main}`}>
      <div className="card">
        <h2>Weather App</h2>

        <div className="search">
          <input
            placeholder="Search city..."
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={searchWeather}>Search</button>
        </div>

        {weather && (
          <div className="weather-info">
            <div className="icon">
              {getIcon()}
            </div>

            <h1>{weather.name}</h1>

            <h2>
              {Math.round(weather.main.temp)}°C
            </h2>

            <p className="desc">
              {weather.weather[0].description}
            </p>

            <div className="details">
              <div>
                <span>Humidity</span>
                <p>{weather.main.humidity}%</p>
              </div>

              <div>
                <span>Wind</span>
                <p>{weather.wind.speed} km/h</p>
              </div>

              <div>
                <span>Feels</span>
                <p>
                  {Math.round(
                    weather.main.feels_like
                  )}°C
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;