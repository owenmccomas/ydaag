"use client"
import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";


export default function CalenderWrapper({center}:{center?: boolean}) {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className={`w-fit ${center ? 'mx-auto' : ''}`}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        </div>
    )
}