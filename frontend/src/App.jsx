import { useState, useEffect } from "react";
import { useGeolocation } from "./hooks/useGeolocation";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import "./App.css";

export default function App() {
  const { position, error: geoError, loading: geoLoading } = useGeolocation();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!position) return;

    setLoading(true);
    fetch(`/api/weather?lat=${position.lat}&lon=${position.lon}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch weather data");
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [position]);

  if (geoLoading) return <Loading message="Getting your location..." />;
  if (geoError) return <ErrorMessage message={geoError} />;
  if (loading) return <Loading message="Fetching weather data..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!weather) return null;

  return (
    <div className="app">
      <h1>Weather</h1>
      <CurrentWeather location={weather.location} current={weather.current} />
      <Forecast days={weather.forecast} />
    </div>
  );
}
