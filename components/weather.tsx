"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"

// Function to convert city and state to coordinates
const geocodeCityState = async (
  city: string,
  state: string
): Promise<{ lat: number; lng: number }> => {
  const address = `${city}, ${state}`
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`

  try {
    const response = await axios.get(url)

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location
      return { lat, lng }
    } else {
      throw new Error("No results found")
    }
  } catch (error) {
    throw new Error("Geocoding request failed")
  }
}

interface WeatherPeriod {
  temperature: number
  shortForecast: string
  startTime: string
  endTime: string
}

const WeatherWidget: React.FC = () => {
  const [currentPeriod, setCurrentPeriod] = useState<WeatherPeriod | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const city = "San Francisco" // Replace with user input
        const state = "CA" // Replace with user input

        const { lat, lng } = await geocodeCityState(city, state) // Convert city and state to coordinates

        const pointsResponse = await axios.get(
          `https://api.weather.gov/points/${lat},${lng}`
        )
        const forecastHourlyUrl = pointsResponse.data.properties.forecastHourly
        const hourlyForecastResponse = await axios.get(forecastHourlyUrl)
        const periods = hourlyForecastResponse.data.properties.periods
        const currentDateTime = new Date()

        for (const period of periods) {
          const startTime = new Date(period.startTime)
          const endTime = new Date(period.endTime)

          if (currentDateTime >= startTime && currentDateTime <= endTime) {
            setCurrentPeriod(period)
            setLoading(false)
            break
          }
        }
      } catch (error) {
        console.error("Error fetching weather data:", error)
        setError("Error fetching weather data")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex justify-end">
      {loading ? (
        <div>Loading weather data...</div>
      ) : error ? (
        <div>{error}</div>
      ) : currentPeriod ? (
        <div>
          {/* <div>Time: {currentPeriod.startTime}</div> */}
          <div>Temperature: {currentPeriod.temperature}&deg;F</div>
          <div>Forecast: {currentPeriod.shortForecast}</div>
        </div>
      ) : (
        <div>No weather data available</div>
      )}
    </div>
  )
}

export default WeatherWidget
