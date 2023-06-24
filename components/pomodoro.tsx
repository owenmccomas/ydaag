"use client"
import React, { useState, useEffect } from 'react';

interface PomodoroTimerProps {
  initialTime: number;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      playChime();
    }
  }, [isPaused, timeLeft]);

  const handleButtonClick = () => {
    setIsPaused(!isPaused);
  };

  const handleButtonDoubleClick = () => {
    setIsPaused(true);
    setTimeLeft(initialTime);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  const playChime = () => {
    const audio = new Audio('/chime.mp3'); // Replace with the actual path to your chime sound file
    audio.play();
  };

  return (
    <div>
      <button onClick={handleButtonClick} onDoubleClick={handleButtonDoubleClick}>
        {formatTime(timeLeft)}
      </button>
    </div>
  );
};

export default PomodoroTimer;
