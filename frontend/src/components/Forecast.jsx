import ForecastDay from "./ForecastDay";
import "./Forecast.css";

export default function Forecast({ days }) {
  return (
    <div className="forecast">
      <h3>3-Day Forecast</h3>
      <div className="forecast-grid">
        {days.map((day) => (
          <ForecastDay key={day.date} day={day} />
        ))}
      </div>
    </div>
  );
}
