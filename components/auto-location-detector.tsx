"use client"

import { useState, useEffect } from "react"
import { MapPin, RefreshCw, AlertCircle } from "lucide-react"
import {
  detectUserLocation,
  getCachedLocation,
  clearLocationCache,
  DEFAULT_LOCATION,
  type UserLocation,
} from "@/services/auto-location-service"

interface AutoLocationDetectorProps {
  onLocationDetected: (location: UserLocation) => void
  currentLocation: UserLocation | null
}

export default function AutoLocationDetector({ onLocationDetected, currentLocation }: AutoLocationDetectorProps) {
  const [isDetecting, setIsDetecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showManualRefresh, setShowManualRefresh] = useState(false)

  // Auto-detect location on component mount if no current location
  useEffect(() => {
    if (!currentLocation) {
      autoDetectLocation()
    }
  }, [currentLocation])

  const autoDetectLocation = async () => {
    setIsDetecting(true)
    setError(null)

    try {
      // First, try to get cached location
      const cached = getCachedLocation()
      if (cached) {
        onLocationDetected(cached)
        setShowManualRefresh(true)
        return
      }

      // If no cache, detect new location
      const location = await detectUserLocation()
      onLocationDetected(location)
      setShowManualRefresh(true)
    } catch (err) {
      console.error("Auto location detection failed:", err)
      setError(err instanceof Error ? err.message : "Gagal mendeteksi lokasi")

      // Use default location as fallback
      onLocationDetected(DEFAULT_LOCATION)
      setShowManualRefresh(true)
    } finally {
      setIsDetecting(false)
    }
  }

  const handleManualRefresh = async () => {
    setIsDetecting(true)
    setError(null)

    try {
      // Clear cache and detect fresh location
      clearLocationCache()
      const location = await detectUserLocation()
      onLocationDetected(location)
    } catch (err) {
      console.error("Manual location refresh failed:", err)
      setError(err instanceof Error ? err.message : "Gagal memperbarui lokasi")
    } finally {
      setIsDetecting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Lokasi Anda
        </h3>
        {showManualRefresh && (
          <button
            onClick={handleManualRefresh}
            disabled={isDetecting}
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50"
            title="Perbarui lokasi"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isDetecting ? "animate-spin" : ""}`} />
            Perbarui
          </button>
        )}
      </div>

      {/* Current location display */}
      {currentLocation && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">{currentLocation.name}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
              </p>
              {currentLocation.timestamp && (
                <p className="text-xs text-green-500 dark:text-green-500 mt-1">
                  Terdeteksi: {new Date(currentLocation.timestamp).toLocaleString("id-ID")}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isDetecting && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {getCachedLocation() ? "Memperbarui lokasi..." : "Mendeteksi lokasi Anda..."}
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">Menggunakan lokasi default: Jakarta</p>
            </div>
          </div>
        </div>
      )}

      {/* Initial detection button */}
      {!currentLocation && !isDetecting && (
        <button
          onClick={autoDetectLocation}
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Deteksi Lokasi Saya
        </button>
      )}

      {/* Help text */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>
          Aplikasi akan menggunakan lokasi Anda untuk menampilkan jadwal sholat yang akurat. Lokasi akan disimpan secara
          lokal dan diperbarui otomatis setiap 24 jam.
        </p>
      </div>
    </div>
  )
}
