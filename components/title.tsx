"use server"

import dynamic from "next/dynamic"
import { currentUser } from "@clerk/nextjs"
import { format } from "date-fns"

import WeatherWidget from "./weather"

const DynamicDigitalClock = dynamic(
  () => import("../components/DigitalClock"),
  {
    ssr: false,
  }
)

export default async function UserTitle() {
  const user = await currentUser()

  if (user)
    return (
      <>
  <div className="flex justify-between mx-auto w-full">
    <div className="flex flex-col">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Good Morning {user?.firstName},
        <br className="hidden sm:inline" />
        This is your day at a glance.
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground">
        {format(Date.now(), "MMMM d, yyyy")}
      </p>
      <p className="text-md text-muted-foreground">
        <DynamicDigitalClock />
      </p>
    </div>
    <div className="ml-auto">
      <WeatherWidget />
    </div>
  </div>
</>


    )
  return <p>Not Logged In</p>
}
