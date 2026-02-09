import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_BASE = "https://api.weatherapi.com/v1";

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "lat and lon query parameters are required" });
  }

  if (!API_KEY) {
    console.error("WEATHER_API_KEY is not set in .env");
    return res.status(500).json({ error: "Server misconfigured — missing API key" });
  }

  const query = `${lat},${lon}`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${WEATHER_BASE}/current.json?key=${API_KEY}&q=${query}`),
      fetch(`${WEATHER_BASE}/forecast.json?key=${API_KEY}&q=${query}&days=3`),
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      const errorBody = !currentRes.ok
        ? await currentRes.json().catch(() => ({}))
        : await forecastRes.json().catch(() => ({}));
      console.error("WeatherAPI error:", errorBody);
      return res.status(502).json({ error: "Failed to fetch weather data from upstream" });
    }

    const [currentData, forecastData] = await Promise.all([
      currentRes.json(),
      forecastRes.json(),
    ]);

    res.json({
      location: currentData.location,
      current: currentData.current,
      forecast: forecastData.forecast.forecastday,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
