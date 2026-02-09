import "./CurrentWeather.css";

export default function CurrentWeather({ location, current }) {
  return (
    <div className="current-weather">
      <h2>
        {location.name}, {location.country}
      </h2>
      <div className="current-main">
        <img
          src={`https:${current.condition.icon}`}
          alt={current.condition.text}
        />
        <span className="temp">{current.temp_c}°C</span>
      </div>
      <p className="condition">{current.condition.text}</p>
      <div className="current-details">
        <span>Feels like {current.feelslike_c}°C</span>
        <span>Wind {current.wind_kph} km/h</span>
        <span>Humidity {current.humidity}%</span>
      </div>
    </div>
  );
}
