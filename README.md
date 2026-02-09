# Weather App — Client-Server Architecture

A simple weather application that teaches client-server architecture using React (Vite) and Express.

## Architecture

```
Browser Geolocation → React Frontend → Express Backend → WeatherAPI.com
                                                        (current + forecast)
```

**Key concept**: The browser gets the user's location, makes ONE request to your backend. The backend makes TWO parallel requests to WeatherAPI.com (current conditions + 3-day forecast), combines the results, and sends them back. The API key never leaves the server.

```
┌─────────────┐     GET /api/weather      ┌─────────────┐    current.json    ┌──────────────┐
│             │     ?lat=X&lon=Y          │             │ ──────────────────>│              │
│   React     │ ────────────────────────> │   Express   │                    │  WeatherAPI  │
│   Frontend  │ <──────────────────────── │   Backend   │ <──────────────────│    .com      │
│  :5173      │   { location, current,    │  :3001      │    forecast.json   │              │
│             │     forecast }            │             │ ──────────────────>│              │
└─────────────┘                           └─────────────┘ <──────────────────└──────────────┘
```

## Prerequisites

- **Node.js 18+** (for `node --watch` support)
- **WeatherAPI.com free account** — [sign up here](https://www.weatherapi.com/signup.aspx) to get an API key

## Project Structure

```
commercial-api-app/
├── backend/          # Express API server
│   ├── package.json
│   ├── .env.example  # Copy to .env and add your API key
│   └── index.js      # Single-file server
└── frontend/         # React (Vite) client
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── hooks/
        │   └── useGeolocation.js
        └── components/
            ├── CurrentWeather.jsx
            ├── Forecast.jsx
            ├── ForecastDay.jsx
            ├── Loading.jsx
            └── ErrorMessage.jsx
```

## Your Task

Build a weather app where:

1. **Backend** (`backend/index.js`):
   - Create an Express server with a single endpoint: `GET /api/weather?lat=X&lon=Y`
   - Validate that `lat` and `lon` query parameters are present
   - Make two **parallel** requests to WeatherAPI.com (current + forecast)
   - Combine and return the results as JSON
   - Keep the API key on the server only (use `dotenv`)

2. **Frontend** (`frontend/`):
   - Scaffold a React app with Vite
   - Create a `useGeolocation` hook to get the user's browser location
   - Fetch weather data from your backend when location is available
   - Display current conditions and a 3-day forecast
   - Handle loading and error states

## Hints

- Use `Promise.all()` to make parallel API requests on the backend
- WeatherAPI.com endpoints: `current.json` and `forecast.json`
- Configure Vite's dev server proxy so `/api` requests forward to Express on port 3001
- WeatherAPI icon URLs start with `//` — prepend `https:` when using them in `<img>` tags
- Use `node --watch index.js` instead of nodemon (built into Node 18+)

## Getting Started

```bash
# Backend
cd backend
cp .env.example .env   # Add your WeatherAPI.com key
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173 and allow the geolocation prompt.
