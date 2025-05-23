"use client"

import { useState, useEffect } from "react"
import type { Location } from "@/services/location-service"

// Default location (Jakarta)
const DEFAULT_LOCATION: Location = {
  id: "3173",
  name: "Jakarta",
  latitude: -6.2088,
  longitude: 106.8456,
  country: "Indonesia",
}

export function useDefaultLocation() {
  const [location, setLocation] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Try to get saved location from localStorage
    const savedLocation = localStorage.getItem("adzan_selected_location")

    if (savedLocation) {
      try {
        setLocation(JSON.parse(savedLocation))
      } catch (error) {
        console.error("Error parsing saved location:", error)
        setLocation(DEFAULT_LOCATION)
      }
    } else {
      // Default to Jakarta
      setLocation(DEFAULT_LOCATION)
    }

    setIsLoading(false)
  }, [])

  // Save location to localStorage whenever it changes
  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation)
    try {
      localStorage.setItem("adzan_selected_location", JSON.stringify(newLocation))
    } catch (error) {
      console.error("Error saving location to localStorage:", error)
    }
  }

  return { location, isLoading, setLocation: updateLocation }
}
