"use client"
import { useState } from "react";
import { Calendar } from "./ui/calendar";


export default function CalenderWrapper() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        </div>
    )
}