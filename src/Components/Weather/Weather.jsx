function Weather({ weather, loading }) {
  if (loading) {
    return (
      <section className="weather-widget weather-loading">
        <span className="weather-loading-text">جاري تحديث الطقس... ⏳</span>
      </section>
    );
  }

  if (!weather || !weather.weather || !weather.weather[0]) return null;

  const weatherIcon = weather.weather[0].icon;
  const weatherDescription = weather.weather[0].description;

  // أيقونات الطقس حسب كود OpenWeather
  const weatherIcons = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "🌤️",
    "02n": "☁️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌧️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };

  const weatherIconDisplay = weatherIcons[weatherIcon] || "🌤️";

  return (
    <section className="weather-widget">
      <div className="weather-top-section">
        <span className="weather-condition-icon">{weatherIconDisplay}</span>

        <div className="weather-temp-block">
          <span className="weather-temp-val">
            {Math.round(weather.main.temp)}°C
          </span>

          <span className="weather-desc-val">{weatherDescription}</span>
        </div>
      </div>

      <div className="weather-horizontal-divider"></div>

      <div className="weather-bottom-section">
        <div className="weather-sub-item">
          <span className="weather-sub-icon">💧</span>
          <span className="weather-sub-label">الرطوبة:</span>
          <span className="weather-sub-val">{weather.main.humidity}%</span>
        </div>

        <div className="weather-sub-separator">✦</div>

        <div className="weather-sub-item">
          <span className="weather-sub-icon">💨</span>
          <span className="weather-sub-label">الرياح:</span>
          <span className="weather-sub-val">{weather.wind.speed} m/s</span>
        </div>
      </div>
    </section>
  );
}

export default Weather;
