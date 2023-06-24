"use client";

import { useEffect, useState } from 'react';

const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (typeof window === 'undefined') {
    // Render a placeholder or loading state on the server
    return <div>Loading...</div>;
  }

  return <div>{currentTime}</div>;
};

export default DigitalClock;
