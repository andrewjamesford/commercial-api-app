export default function ForecastDay({ day }) {
  const date = new Date(day.date + "T00:00:00");
  const label = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="forecast-day">
      <p className="forecast-date">{label}</p>
      <img
        src={`https:${day.day.condition.icon}`}
        alt={day.day.condition.text}
      />
      <p className="forecast-temps">
        <span className="high">{Math.round(day.day.maxtemp_c)}°</span>
        {" / "}
        <span className="low">{Math.round(day.day.mintemp_c)}°</span>
      </p>
      <p className="forecast-rain">{day.day.daily_chance_of_rain}% rain</p>
    </div>
  );
}
