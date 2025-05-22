"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [forecasts, setForecasts] = useState<any[]>([]);

  async function populateWeatherData() {
    const response = await fetch("http://localhost:5127/weatherforecast");
    if (response.ok) {
      const data = await response.json();
      setForecasts(data);
    } else {
      console.log("data not found");
    }
  }

  useEffect(() => {
    populateWeatherData();
  }, []);

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-4xl space-y-4">
        <div className="mt-5">yoyoyoyoyyoyoyo</div>
        {forecasts.map((forecast) => (
          <div
            className="flex justify-between gap-4 bg-white/5 p-4 rounded-md shadow-sm backdrop-blur-sm"
            key={forecast.date}
          >
            <div className="flex-1 text-sm text-gray-300">{forecast.date}</div>
            <div className="flex-1 text-sm text-gray-300">
              {forecast.temperatureC}°C
            </div>
            <div className="flex-1 text-sm text-gray-300">
              {forecast.temperatureF}°F
            </div>
            <div className="flex-1 text-sm text-gray-300">
              {forecast.summary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
