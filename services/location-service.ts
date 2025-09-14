// Location service for getting user's location and Indonesia cities

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Location {
  id: string
  name: string
  latitude: number
  longitude: number
  country: string
}

// Major cities in Indonesia
export const indonesianCities: Location[] = [
  { id: "jakarta", name: "Jakarta", latitude: -6.2088, longitude: 106.8456, country: "Indonesia" },
  { id: "surabaya", name: "Surabaya", latitude: -7.2575, longitude: 112.7521, country: "Indonesia" },
  { id: "bandung", name: "Bandung", latitude: -6.9175, longitude: 107.6191, country: "Indonesia" },
  { id: "medan", name: "Medan", latitude: 3.5952, longitude: 98.6722, country: "Indonesia" },
  { id: "semarang", name: "Semarang", latitude: -6.9932, longitude: 110.4203, country: "Indonesia" },
  { id: "makassar", name: "Makassar", latitude: -5.1477, longitude: 119.4327, country: "Indonesia" },
  { id: "palembang", name: "Palembang", latitude: -2.9761, longitude: 104.7754, country: "Indonesia" },
  { id: "tangerang", name: "Tangerang", latitude: -6.1701, longitude: 106.6403, country: "Indonesia" },
  { id: "depok", name: "Depok", latitude: -6.4025, longitude: 106.7942, country: "Indonesia" },
  { id: "yogyakarta", name: "Yogyakarta", latitude: -7.7971, longitude: 110.3688, country: "Indonesia" },
  { id: "denpasar", name: "Denpasar", latitude: -8.6705, longitude: 115.2126, country: "Indonesia" },
  { id: "malang", name: "Malang", latitude: -7.9797, longitude: 112.6304, country: "Indonesia" },
  { id: "padang", name: "Padang", latitude: -0.9471, longitude: 100.4172, country: "Indonesia" },
  { id: "manado", name: "Manado", latitude: 1.4748, longitude: 124.8421, country: "Indonesia" },
  { id: "aceh", name: "Banda Aceh", latitude: 5.5483, longitude: 95.3238, country: "Indonesia" },
  { id: "pontianak", name: "Pontianak", latitude: 0.0263, longitude: 109.3425, country: "Indonesia" },
  { id: "jayapura", name: "Jayapura", latitude: -2.5916, longitude: 140.6689, country: "Indonesia" },
  { id: "ambon", name: "Ambon", latitude: -3.6954, longitude: 128.1814, country: "Indonesia" },
  { id: "pekanbaru", name: "Pekanbaru", latitude: 0.5103, longitude: 101.4478, country: "Indonesia" },
  { id: "samarinda", name: "Samarinda", latitude: -0.5022, longitude: 117.1536, country: "Indonesia" },
]

// Get user's current location using browser's Geolocation API
export function getUserLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"))
      return
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
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
            errorMessage = "User denied the request for geolocation"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable"
            break
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out"
            break
          default:
            errorMessage = "An unknown error occurred"
            break
        }
        reject(new Error(errorMessage))
      },
      options,
    )
  })
}

// Find the nearest city to the user's coordinates
export function findNearestCity(coords: Coordinates): Location {
  let nearestCity = indonesianCities[0]
  let minDistance = calculateDistance(coords.latitude, coords.longitude, nearestCity.latitude, nearestCity.longitude)

  for (let i = 1; i < indonesianCities.length; i++) {
    const city = indonesianCities[i]
    const distance = calculateDistance(coords.latitude, coords.longitude, city.latitude, city.longitude)

    if (distance < minDistance) {
      minDistance = distance
      nearestCity = city
    }
  }

  return nearestCity
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance
}
