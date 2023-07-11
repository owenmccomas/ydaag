"use client"

import React, { useEffect, useState } from "react"

import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Switch } from "./ui/switch"

interface PomodoroTimerProps {
  initialTime: number
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime * 60)
  const [isPaused, setIsPaused] = useState(false)
  const [showProg, setShowProg] = useState<boolean>(false)

  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      playChime()
    }
  }, [isPaused, timeLeft])

  const handleButtonClick = () => {
    setIsPaused(!isPaused)
  }

  const handleButtonDoubleClick = () => {
    setIsPaused(true)
    setTimeLeft(initialTime * 60)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0")
    return `${minutes}:${remainingSeconds}`
  }

  const playChime = () => {
    const audio = new Audio("/chime.mp3") // Replace with the actual path to your chime sound file
    audio.play()
  }

  return (
    <div>
      <div className="relative">
        <div className="flex w-[325px] flex-wrap items-center justify-between rounded-lg border h-12 px-1 transition-transform mb-1">
          <Button
            variant={"outline"}
            onClick={handleButtonClick}
            onDoubleClick={handleButtonDoubleClick}
            className="position-absolute"
          >
            {formatTime(timeLeft)}
          </Button>
          <p
            className="tracking-hughJanus text-center font-mono text-2xl uppercase"
            style={{ letterSpacing: ".3em" }}
          >
            Pomodoro
          </p>
          <Switch className="mr-2" onClick={() => setShowProg(!showProg)} />
        </div>
        {showProg && (
          <div className="absolute top-13 left-0 w-full">
            <Progress
              className="w-full"
              value={100 - (timeLeft / (initialTime * 60)) * 100}
              max={100}
            />
          </div>
        )}
      </div>
      {/* Rest of the content */}
    </div>
  );
  
}

export default PomodoroTimer
