"use client"

import { useState, useEffect } from "react"
import { getCachedLocation, DEFAULT_LOCATION, type UserLocation } from "@/services/auto-location-service"

export function useDefaultLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Try to get cached location first
    const cached = getCachedLocation()

    if (cached) {
      setLocation(cached)
    } else {
      // Use default location if no cache
      setLocation(DEFAULT_LOCATION)
    }

    setIsLoading(false)
  }, [])

  // Update location and save to cache
  const updateLocation = (newLocation: UserLocation) => {
    setLocation(newLocation)
    // The auto-location-service handles saving to localStorage
  }

  return { location, isLoading, setLocation: updateLocation }
}
