// Simplified location service with auto-detection and reverse geocoding

export interface UserLocation {
  id: string
  name: string
  latitude: number
  longitude: number
  country: string
  address?: string
  timestamp: number // When the location was detected
}

// Cache key for localStorage
const LOCATION_CACHE_KEY = "adzan_user_location"
const LOCATION_CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

/**
 * Get user's current location using browser's Geolocation API
 */
export function getCurrentPosition(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"))
      return
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 5 * 60 * 1000, // 5 minutes
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => {
        let errorMessage
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Akses lokasi ditolak. Silakan izinkan akses lokasi di browser Anda."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Informasi lokasi tidak tersedia."
            break
          case error.TIMEOUT:
            errorMessage = "Permintaan lokasi timeout. Silakan coba lagi."
            break
          default:
            errorMessage = "Terjadi kesalahan saat mengambil lokasi."
            break
        }
        reject(new Error(errorMessage))
      },
      options,
    )
  })
}

/**
 * Reverse geocode coordinates to get location name
 */
export async function reverseGeocode(latitude: number, longitude: number): Promise<string> {
  try {
    const response = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&format=json`, {
      method: "GET",
      headers: {
        "User-Agent": "Adzan-Web-App/1.0",
      },
    })

    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.status}`)
    }

    const data = await response.json()
    console.log("Reverse geocoding response:", data) // Debug log

    // Get the full address from display_name
    if (data.display_name) {
      // Split the display_name by comma and get meaningful parts
      const addressParts = data.display_name.split(", ")

      // For Indonesian addresses, we typically want to show:
      // [Village/District], [City/Regency], [Province]
      // The format is usually: specific_location, district, city, province, country

      let locationName = data.display_name

      // Try to extract city and province (usually the last 2-3 parts before country)
      if (addressParts.length >= 3) {
        // Remove country (last part) and get city + province
        const relevantParts = addressParts.slice(-3, -1) // Get last 2 parts before country
        locationName = relevantParts.join(", ")
      } else if (addressParts.length >= 2) {
        // If shorter, just remove country
        locationName = addressParts.slice(0, -1).join(", ")
      }

      return locationName || data.display_name
    }

    // Fallback: try to construct from address components
    if (data.address) {
      const { village, city, town, county, state, country } = data.address
      const parts = []

      if (village) parts.push(village)
      if (city || town) parts.push(city || town)
      if (county && county !== (city || town)) parts.push(county)
      if (state && state !== country) parts.push(state)

      if (parts.length > 0) {
        return parts.join(", ")
      }
    }

    return "Lokasi Tidak Diketahui"
  } catch (error) {
    console.error("Reverse geocoding error:", error)
    return "Lokasi Tidak Diketahui"
  }
}

/**
 * Detect user location and get address
 */
export async function detectUserLocation(): Promise<UserLocation> {
  try {
    // Get coordinates
    const coords = await getCurrentPosition()
    console.log("Got coordinates:", coords) // Debug log

    // Get address using reverse geocoding
    const locationName = await reverseGeocode(coords.latitude, coords.longitude)
    console.log("Got location name:", locationName) // Debug log

    const userLocation: UserLocation = {
      id: `auto_${Date.now()}`,
      name: locationName,
      latitude: coords.latitude,
      longitude: coords.longitude,
      country: "Indonesia",
      address: locationName,
      timestamp: Date.now(),
    }

    // Save to localStorage
    saveLocationToCache(userLocation)

    return userLocation
  } catch (error) {
    console.error("Error detecting user location:", error)
    throw error
  }
}

/**
 * Save location to localStorage
 */
export function saveLocationToCache(location: UserLocation): void {
  try {
    localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(location))
    console.log("Location saved to cache:", location) // Debug log
  } catch (error) {
    console.error("Error saving location to cache:", error)
  }
}

/**
 * Get cached location from localStorage
 */
export function getCachedLocation(): UserLocation | null {
  try {
    const cached = localStorage.getItem(LOCATION_CACHE_KEY)
    if (!cached) return null

    const location: UserLocation = JSON.parse(cached)

    // Check if cache is still valid (24 hours)
    const now = Date.now()
    if (now - location.timestamp > LOCATION_CACHE_DURATION) {
      // Cache expired, remove it
      localStorage.removeItem(LOCATION_CACHE_KEY)
      return null
    }

    console.log("Using cached location:", location) // Debug log
    return location
  } catch (error) {
    console.error("Error reading cached location:", error)
    // Remove corrupted cache
    localStorage.removeItem(LOCATION_CACHE_KEY)
    return null
  }
}

/**
 * Clear cached location
 */
export function clearLocationCache(): void {
  try {
    localStorage.removeItem(LOCATION_CACHE_KEY)
    console.log("Location cache cleared") // Debug log
  } catch (error) {
    console.error("Error clearing location cache:", error)
  }
}

/**
 * Check if cached location is still valid
 */
export function isCacheValid(): boolean {
  const cached = getCachedLocation()
  return cached !== null
}

// Default fallback location (Jakarta)
export const DEFAULT_LOCATION: UserLocation = {
  id: "default_jakarta",
  name: "Jakarta, DKI Jakarta",
  latitude: -6.2088,
  longitude: 106.8456,
  country: "Indonesia",
  address: "Jakarta, DKI Jakarta, Indonesia",
  timestamp: Date.now(),
}
