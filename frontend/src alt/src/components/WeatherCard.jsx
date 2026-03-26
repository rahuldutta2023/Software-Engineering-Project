import { t } from '../i18n';
import './components.css';

const WEATHER_ICONS = {
  "Clear": "☀️",
  "Partly Cloudy": "⛅",
  "Cloudy": "☁️",
  "Rain": "🌧️",
  "Thunderstorm": "⛈️",
  "Fog": "🌫️",
};

export default function WeatherCard({ weather, lang = "en" }) {
  if (!weather) return null;
  const { city, temperature, condition, humidity, wind_speed } = weather;

  return (
    <div className="c-card">
      <div className="c-card-title">{t(lang, "cmpWeather")} — {city}</div>

      <div className="weather-row">
        <div className="weather-icon">{WEATHER_ICONS[condition] || "🌡️"}</div>
        <div className="weather-temp">{temperature}°C</div>
      </div>

      <p className="weather-condition">{condition}</p>

      <div className="weather-meta-grid">
        <div className="weather-meta-item">
          <p className="meta-label">{t(lang, "cmpHumidity")}</p>
          <p className="meta-value">{humidity}%</p>
        </div>
        <div className="weather-meta-item">
          <p className="meta-label">{t(lang, "cmpWind")}</p>
          <p className="meta-value">{wind_speed} km/h</p>
        </div>
      </div>
    </div>
  );
}
