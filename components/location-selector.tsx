"use client"

import { useState, useEffect } from "react"
import { type Location, indonesianCities, getUserLocation, findNearestCity } from "@/services/location-service"

interface LocationSelectorProps {
  selectedLocation: Location | null
  onLocationChange: (location: Location) => void
}

export default function LocationSelector({ selectedLocation, onLocationChange }: LocationSelectorProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedLocation) {
      detectUserLocation()
    }
  }, [selectedLocation])

  const detectUserLocation = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Check if geolocation is available in this environment
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser")
      }

      // Set a timeout for geolocation request
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Geolocation request timed out")), 5000)
      })

      // Race between geolocation and timeout
      const coords = await Promise.race([getUserLocation(), timeoutPromise])

      const nearestCity = findNearestCity(coords)
      onLocationChange(nearestCity)
    } catch (err) {
      console.error("Error getting user location:", err)
      setError("Tidak dapat mendeteksi lokasi. Silakan pilih lokasi secara manual.")
      // Default to Jakarta if location detection fails
      onLocationChange(indonesianCities[0])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <label htmlFor="location" className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-400">
        Pilih Lokasi
      </label>
      <div className="relative w-full max-w-xs">
        <select
          id="location"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2 w-full text-gray-700 dark:text-gray-300"
          value={selectedLocation?.id || ""}
          onChange={(e) => {
            const selected = indonesianCities.find((city) => city.id === e.target.value)
            if (selected) {
              onLocationChange(selected)
            }
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <option value="">Mendeteksi lokasi...</option>
          ) : (
            <>
              {indonesianCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </>
          )}
        </select>
        {isLoading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 dark:border-gray-400"></div>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500 dark:text-red-400 mt-1">{error}</p>}
      {!isLoading && (
        <button
          onClick={detectUserLocation}
          className="mt-2 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1 rounded-md"
        >
          Coba deteksi lokasi saya
        </button>
      )}
    </div>
  )
}
