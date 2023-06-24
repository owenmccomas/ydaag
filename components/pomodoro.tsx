"use client"
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';

interface PomodoroTimerProps {
  initialTime: number;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);
  const [showProg, setShowProg] = useState<boolean>(false);

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
    <div className='flex w-[500px] flex-wrap items-center justify-between rounded-lg border p-3 transition-transform'>
      <Button variant={'outline'} onClick={handleButtonClick} onDoubleClick={handleButtonDoubleClick}>
        {formatTime(timeLeft)}
      </Button>
      <p className='tracking-hughJanus text-center font-mono text-2xl uppercase' style={{letterSpacing: '.5em'}}>Pomodoro</p>
      <Switch className='mr-2' onClick={()=>setShowProg(!showProg)} />
      {showProg && <Progress className='mx-auto mt-3 w-10/12' value={timeLeft / 600} max={initialTime / 60} />}
    </div>
  );
};

export default PomodoroTimer;
