import { useState, useEffect } from "react";

const ERROR_MESSAGES = {
  1: "Location access denied. Please enable location permissions in your browser settings.",
  2: "Unable to determine your location. Please try again.",
  3: "Location request timed out. Please try again.",
};

export function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setLoading(false);
      },
      (err) => {
        setError(ERROR_MESSAGES[err.code] || "An unknown location error occurred.");
        setLoading(false);
      }
    );
  }, []);

  return { position, error, loading };
}
