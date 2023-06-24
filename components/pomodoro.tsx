"use client"
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

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
  return (
    <div className='border rounded-lg w-[200px] p-5 m-5'>
      <Button onClick={handleButtonClick} onDoubleClick={handleButtonDoubleClick}>
        {formatTime(timeLeft)}
      </Button>
      {
        !isPaused && <Progress value={timeLeft / 1000} className="w-full" />
      }
    </div>
  );
};

export default PomodoroTimer;
