"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherPeriod {
  temperature: number;
  shortForecast: string;
  startTime: string;
  endTime: string;
}

const WeatherWidget: React.FC = () => {
  const [currentPeriod, setCurrentPeriod] = useState<WeatherPeriod | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.weather.gov/gridpoints/OTX/141,91/forecast/hourly'
        );
        const periods = response.data.properties.periods;
        const currentDateTime = new Date();

        for (const period of periods) {
          const startTime = new Date(period.startTime);
          const endTime = new Date(period.endTime);

          if (currentDateTime >= startTime && currentDateTime <= endTime) {
            setCurrentPeriod(period);
            break;
          }
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-end">
      {currentPeriod ? (
        <div>
          {/* <div>Time: {currentPeriod.startTime}</div> */}
          <div>Temperature: {currentPeriod.temperature}&deg;F</div>
          <div>Forecast: {currentPeriod.shortForecast}</div>
        </div>
      ) : (
        <div>Loading weather data...</div>
      )}
    </div>
  );
};

export default WeatherWidget;
