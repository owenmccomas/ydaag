"use client";

import React from 'react';
import { Button } from './ui/button';

const Weather = require('weather');

interface WeatherProps {
  appID: string | undefined;
  appCode: string | undefined;
}

const WeatherWidget: React.FC<WeatherProps> = ({ appID, appCode }) => {
  const weather = new Weather({
    appID,
    appCode
  });

  // now(<location>) returns a Promise
  const getWeather = (location: string) => {
    weather.now(location).then((results: any) => {
      console.log(results);
    });
  };

  return (
    <Button onClick={() => getWeather('Brisbane, Australia')}>Weather</Button>
  );
};

export default WeatherWidget;
