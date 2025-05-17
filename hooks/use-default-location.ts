"use client"

import { useState, useEffect } from "react"
import { type Location, indonesianCities } from "@/services/location-service"

export function useDefaultLocation() {
  const [location, setLocation] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Default to Jakarta (first city in our list)
    setLocation(indonesianCities[0])
    setIsLoading(false)
  }, [])

  return { location, isLoading, setLocation }
}
