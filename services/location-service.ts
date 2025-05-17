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
// export const indonesianCities: Location[] = [
//   { id: "ambarawa", name: "Ambarawa", latitude: -7.2632, longitude: 110.3975, country: "Indonesia" },
//   { id: "ambon", name: "Ambon", latitude: -3.6954, longitude: 128.1814, country: "Indonesia" },
//   { id: "amlapura", name: "Amlapura", latitude: -8.4521, longitude: 115.6107, country: "Indonesia" },
//   { id: "amuntai", name: "Amuntai", latitude: -2.4177, longitude: 115.2492, country: "Indonesia" },
//   { id: "argamakmur", name: "Argamakmur", latitude: -3.4495, longitude: 102.1940, country: "Indonesia" },
//   { id: "atambua", name: "Atambua", latitude: -9.1062, longitude: 124.8924, country: "Indonesia" },
//   { id: "babo", name: "Babo", latitude: -2.5329, longitude: 133.4272, country: "Indonesia" },
//   { id: "bajawa", name: "Bajawa", latitude: -8.7951, longitude: 120.9756, country: "Indonesia" },
//   { id: "balige", name: "Balige", latitude: 2.3297, longitude: 99.0819, country: "Indonesia" },
//   { id: "balikpapan", name: "Balikpapan", latitude: -1.2379, longitude: 116.8529, country: "Indonesia" },
//   { id: "banda_aceh", name: "Banda Aceh", latitude: 5.5483, longitude: 95.3238, country: "Indonesia" },
//   { id: "bandar_lampung", name: "Bandar Lampung", latitude: -5.3971, longitude: 105.2661, country: "Indonesia" },
//   { id: "bandung", name: "Bandung", latitude: -6.9175, longitude: 107.6191, country: "Indonesia" },
//   { id: "banjar", name: "Banjar", latitude: -7.3667, longitude: 108.5347, country: "Indonesia" },
//   { id: "banjarbaru", name: "Banjarbaru", latitude: -3.4571, longitude: 114.8313, country: "Indonesia" },
//   { id: "banjarmasin", name: "Banjarmasin", latitude: -3.3186, longitude: 114.5944, country: "Indonesia" },
//   { id: "banyuwangi", name: "Banyuwangi", latitude: -8.2301, longitude: 114.3598, country: "Indonesia" },
//   { id: "batam", name: "Batam", latitude: 1.1301, longitude: 104.0529, country: "Indonesia" },
//   { id: "batu", name: "Batu", latitude: -7.8672, longitude: 112.5239, country: "Indonesia" },
//   { id: "bau-bau", name: "Bau-Bau", latitude: -5.4700, longitude: 122.6167, country: "Indonesia" },
//   { id: "bekasi", name: "Bekasi", latitude: -6.2349, longitude: 106.9953, country: "Indonesia" },
//   { id: "bengkalis", name: "Bengkalis", latitude: 1.4664, longitude: 102.2521, country: "Indonesia" },
//   { id: "bengkulu", name: "Bengkulu", latitude: -3.7928, longitude: 102.2608, country: "Indonesia" },
//   { id: "biak", name: "Biak", latitude: -1.1838, longitude: 136.0478, country: "Indonesia" },
//   { id: "bima", name: "Bima", latitude: -8.4653, longitude: 118.7272, country: "Indonesia" },
//   { id: "binjai", name: "Binjai", latitude: 3.6135, longitude: 98.4850, country: "Indonesia" },
//   { id: "bitung", name: "Bitung", latitude: 1.4402, longitude: 125.1211, country: "Indonesia" },
//   { id: "blitar", name: "Blitar", latitude: -8.0954, longitude: 112.1609, country: "Indonesia" },
//   { id: "blora", name: "Blora", latitude: -6.9709, longitude: 111.3798, country: "Indonesia" },
//   { id: "bogor", name: "Bogor", latitude: -6.5971, longitude: 106.8060, country: "Indonesia" },
//   { id: "bojonegoro", name: "Bojonegoro", latitude: -7.1510, longitude: 111.8816, country: "Indonesia" },
//   { id: "bondowoso", name: "Bondowoso", latitude: -7.9113, longitude: 113.8213, country: "Indonesia" },
//   { id: "bontang", name: "Bontang", latitude: 0.1220, longitude: 117.4800, country: "Indonesia" },
//   { id: "bukittinggi", name: "Bukittinggi", latitude: -0.3039, longitude: 100.3728, country: "Indonesia" },
//   { id: "buli", name: "Buli", latitude: 0.9178, longitude: 128.3581, country: "Indonesia" },
//   { id: "bulukumba", name: "Bulukumba", latitude: -5.3955, longitude: 120.2050, country: "Indonesia" },
//   { id: "buntok", name: "Buntok", latitude: -1.7321, longitude: 114.8409, country: "Indonesia" },
//   { id: "cepu", name: "Cepu", latitude: -7.1484, longitude: 111.5864, country: "Indonesia" },
//   { id: "ciamis", name: "Ciamis", latitude: -7.3271, longitude: 108.3498, country: "Indonesia" },
//   { id: "cianjur", name: "Cianjur", latitude: -6.8304, longitude: 107.1396, country: "Indonesia" },
//   { id: "cibinong", name: "Cibinong", latitude: -6.4821, longitude: 106.8519, country: "Indonesia" },
//   { id: "cilacap", name: "Cilacap", latitude: -7.7262, longitude: 109.0152, country: "Indonesia" },
//   { id: "cilegon", name: "Cilegon", latitude: -6.0169, longitude: 106.0517, country: "Indonesia" },
//   { id: "cimahi", name: "Cimahi", latitude: -6.8845, longitude: 107.5413, country: "Indonesia" },
//   { id: "cirebon", name: "Cirebon", latitude: -6.7320, longitude: 108.5523, country: "Indonesia" },
//   { id: "curup", name: "Curup", latitude: -3.4765, longitude: 102.5332, country: "Indonesia" },
//   { id: "demak", name: "Demak", latitude: -6.8898, longitude: 110.6382, country: "Indonesia" },
//   { id: "denpasar", name: "Denpasar", latitude: -8.6705, longitude: 115.2126, country: "Indonesia" },
//   { id: "depok", name: "Depok", latitude: -6.4025, longitude: 106.7942, country: "Indonesia" },
//   { id: "dili", name: "Dili", latitude: -8.5536, longitude: 125.5783, country: "Indonesia" },
//   { id: "dompu", name: "Dompu", latitude: -8.5364, longitude: 118.4624, country: "Indonesia" },
//   { id: "donggala", name: "Donggala", latitude: -0.4938, longitude: 119.8368, country: "Indonesia" },
//   { id: "dumai", name: "Dumai", latitude: 1.6658, longitude: 101.4073, country: "Indonesia" },
//   { id: "ende", name: "Ende", latitude: -8.8540, longitude: 121.6609, country: "Indonesia" },
//   { id: "enrekang", name: "Enrekang", latitude: -3.5714, longitude: 119.7889, country: "Indonesia" },
//   { id: "fakfak", name: "Fakfak", latitude: -2.9264, longitude: 132.2951, country: "Indonesia" },
//   { id: "garut", name: "Garut", latitude: -7.2110, longitude: 107.9031, country: "Indonesia" },
//   { id: "gianyar", name: "Gianyar", latitude: -8.5371, longitude: 115.3240, country: "Indonesia" },
//   { id: "gombong", name: "Gombong", latitude: -7.6076, longitude: 109.5142, country: "Indonesia" },
//   { id: "gorontalo", name: "Gorontalo", latitude: 0.5387, longitude: 123.0596, country: "Indonesia" },
//   { id: "gresik", name: "Gresik", latitude: -7.1542, longitude: 112.6528, country: "Indonesia" },
//   { id: "gunungsitoli", name: "Gunungsitoli", latitude: 1.2958, longitude: 97.6158, country: "Indonesia" },
//   { id: "indramayu", name: "Indramayu", latitude: -6.3378, longitude: 108.3207, country: "Indonesia" },
//   { id: "jakarta", name: "Jakarta", latitude: -6.2088, longitude: 106.8456, country: "Indonesia" },
//   { id: "jambi", name: "Jambi", latitude: -1.6101, longitude: 103.6131, country: "Indonesia" },
//   { id: "jayapura", name: "Jayapura", latitude: -2.5916, longitude: 140.6690, country: "Indonesia" },
//   { id: "jember", name: "Jember", latitude: -8.1684, longitude: 113.7028, country: "Indonesia" },
//   { id: "jeneponto", name: "Jeneponto", latitude: -5.5545, longitude: 119.6733, country: "Indonesia" },
//   { id: "jepara", name: "Jepara", latitude: -6.5944, longitude: 110.6679, country: "Indonesia" },
//   { id: "jombang", name: "Jombang", latitude: -7.5539, longitude: 112.2261, country: "Indonesia" },
//   { id: "kabanjahe", name: "Kabanjahe", latitude: 3.1007, longitude: 98.4908, country: "Indonesia" },
//   { id: "kalabahi", name: "Kalabahi", latitude: -8.2145, longitude: 124.5125, country: "Indonesia" },
//   { id: "kalianda", name: "Kalianda", latitude: -5.7292, longitude: 105.5878, country: "Indonesia" },
//   { id: "kandangan", name: "Kandangan", latitude: -2.7654, longitude: 115.2517, country: "Indonesia" },
//   { id: "karanganyar", name: "Karanganyar", latitude: -7.5986, longitude: 110.9583, country: "Indonesia" },
//   { id: "karawang", name: "Karawang", latitude: -6.3227, longitude: 107.3376, country: "Indonesia" },
//   { id: "kasungan", name: "Kasungan", latitude: -1.3390, longitude: 113.4422, country: "Indonesia" },
//   { id: "kayuagung", name: "Kayuagung", latitude: -3.3933, longitude: 104.8313, country: "Indonesia" },
//   { id: "kebumen", name: "Kebumen", latitude: -7.6683, longitude: 109.6522, country: "Indonesia" },
//   { id: "kediri", name: "Kediri", latitude: -7.8178, longitude: 112.0184, country: "Indonesia" },
//   { id: "kendal", name: "Kendal", latitude: -6.9213, longitude: 110.2030, country: "Indonesia" },
//   { id: "kendari", name: "Kendari", latitude: -3.9985, longitude: 122.5130, country: "Indonesia" },
//   { id: "kertosono", name: "Kertosono", latitude: -7.5876, longitude: 112.0927, country: "Indonesia" },
//   { id: "ketapang", name: "Ketapang", latitude: -1.8269, longitude: 109.9721, country: "Indonesia" },
//   { id: "kisaran", name: "Kisaran", latitude: 2.9845, longitude: 99.6158, country: "Indonesia" },
//   { id: "klaten", name: "Klaten", latitude: -7.7053, longitude: 110.6080, country: "Indonesia" },
//   { id: "kolaka", name: "Kolaka", latitude: -4.0375, longitude: 121.5895, country: "Indonesia" },
//   { id: "kota_agung", name: "Kota Agung", latitude: -5.4940, longitude: 104.6219, country: "Indonesia" },
//   { id: "kota_baru_pulau_laut", name: "Kota Baru Pulau Laut", latitude: -3.2952, longitude: 116.1649, country: "Indonesia" },
//   { id: "kota_bumi", name: "Kota Bumi", latitude: -4.8286, longitude: 104.8718, country: "Indonesia" },
//   { id: "kota_jantho", name: "Kota Jantho", latitude: 5.2940, longitude: 95.5925, country: "Indonesia" },
//   { id: "kotamobagu", name: "Kotamobagu", latitude: 0.7246, longitude: 124.3199, country: "Indonesia" },
//   { id: "kuala_kapuas", name: "Kuala Kapuas", latitude: -3.0094, longitude: 114.3859, country: "Indonesia" },
//   { id: "kuala_kurun", name: "Kuala Kurun", latitude: -1.1283, longitude: 113.8704, country: "Indonesia" },
//   { id: "kuala_pembuang", name: "Kuala Pembuang", latitude: -3.0040, longitude: 112.4707, country: "Indonesia" },
//   { id: "kuala_tungkal", name: "Kuala Tungkal", latitude: -0.8157, longitude: 103.4618, country: "Indonesia" },
//   { id: "kudus", name: "Kudus", latitude: -6.8049, longitude: 110.8428, country: "Indonesia" },
//   { id: "kuningan", name: "Kuningan", latitude: -6.9758, longitude: 108.4830, country: "Indonesia" },
//   { id: "kupang", name: "Kupang", latitude: -10.1772, longitude: 123.6070, country: "Indonesia" },
//   { id: "kutacane", name: "Kutacane", latitude: 3.4991, longitude: 97.7980, country: "Indonesia" },
//   { id: "kutoarjo", name: "Kutoarjo", latitude: -7.7170, longitude: 109.9132, country: "Indonesia" },
//   { id: "labuhan", name: "Labuhan", latitude: -6.3778, longitude: 106.0759, country: "Indonesia" },
//   { id: "lahat", name: "Lahat", latitude: -3.7985, longitude: 103.5421, country: "Indonesia" },
//   { id: "laiwui", name: "Laiwui", latitude: -0.6329, longitude: 127.5021, country: "Indonesia" },
//   { id: "langsa", name: "Langsa", latitude: 4.4725, longitude: 97.9756, country: "Indonesia" },
//   { id: "larantuka", name: "Larantuka", latitude: -8.3591, longitude: 122.9849, country: "Indonesia" },
//   { id: "lawang", name: "Lawang", latitude: -7.8446, longitude: 112.6957, country: "Indonesia" },
//   { id: "lhokseumawe", name: "Lhokseumawe", latitude: 5.1812, longitude: 97.1413, country: "Indonesia" },
//   { id: "limboto", name: "Limboto", latitude: 0.6167, longitude: 122.9999, country: "Indonesia" },
//   { id: "lubuklinggau", name: "Lubuklinggau", latitude: -3.2962, longitude: 102.8559, country: "Indonesia" },
//   { id: "lumajang", name: "Lumajang", latitude: -8.1335, longitude: 113.2227, country: "Indonesia" },
//   { id: "luwuk", name: "Luwuk", latitude: -0.9515, longitude: 122.7915, country: "Indonesia" },
//   { id: "madiun", name: "Madiun", latitude: -7.6298, longitude: 111.5300, country: "Indonesia" },
//   { id: "magelang", name: "Magelang", latitude: -7.4797, longitude: 110.2177, country: "Indonesia" },
//   { id: "magetan", name: "Magetan", latitude: -7.6460, longitude: 111.3291, country: "Indonesia" },
//   { id: "majalengka", name: "Majalengka", latitude: -6.8360, longitude: 108.2284, country: "Indonesia" },
//   { id: "makale", name: "Makale", latitude: -3.1038, longitude: 119.8525, country: "Indonesia" },
//   { id: "makassar", name: "Makassar", latitude: -5.1477, longitude: 119.4327, country: "Indonesia" },
//   { id: "malang", name: "Malang", latitude: -7.9797, longitude: 112.6304, country: "Indonesia" },
//   { id: "mamuju", name: "Mamuju", latitude: -2.6749, longitude: 118.8623, country: "Indonesia" },
//   { id: "manna", name: "Manna", latitude: -4.4518, longitude: 102.9063, country: "Indonesia" },
//   { id: "manokwari", name: "Manokwari", latitude: -0.8615, longitude: 134.0620, country: "Indonesia" },
//   { id: "marabahan", name: "Marabahan", latitude: -2.9894, longitude: 114.7657, country: "Indonesia" },
//   { id: "maros", name: "Maros", latitude: -5.0059, longitude: 119.5743, country: "Indonesia" },
//   { id: "martapura_kalsel", name: "Martapura Kalsel", latitude: -3.4109, longitude: 114.8646, country: "Indonesia" },
//   { id: "martapura_kalbar", name: "Martapura Kalbar", latitude: -3.9283, longitude: 104.0305, country: "Indonesia" },
//   { id: "maumere", name: "Maumere", latitude: -8.6195, longitude: 122.2123, country: "Indonesia" },
//   { id: "medan", name: "Medan", latitude: 3.5952, longitude: 98.6722, country: "Indonesia" },
//   { id: "mempawah", name: "Mempawah", latitude: 0.3897, longitude: 109.1390, country: "Indonesia" },
//   { id: "menado", name: "Menado", latitude: 1.4748, longitude: 124.8421, country: "Indonesia" },
//   { id: "merangin", name: "Merangin", latitude: -1.6140, longitude: 102.1430, country: "Indonesia" },
//   { id: "mojokerto", name: "Mojokerto", latitude: -7.4704, longitude: 112.4342, country: "Indonesia" },
//   { id: "moro", name: "Moro", latitude: 1.2000, longitude: 104.5000, country: "Indonesia" },
//   { id: "muara_teweh", name: "Muara Teweh", latitude: -2.9667, longitude: 114.9000, country: "Indonesia" },
//   { id: "muaro_jambi", name: "Muaro Jambi", latitude: -1.6167, longitude: 103.5833, country: "Indonesia" },
//   { id: "nganjuk", name: "Nganjuk", latitude: -7.6139, longitude: 111.9136, country: "Indonesia" },
//   { id: "ngawi", name: "Ngawi", latitude: -7.5425, longitude: 111.4308, country: "Indonesia" },
//   { id: "nusaniwe", name: "Nusaniwe", latitude: -3.1236, longitude: 128.1944, country: "Indonesia" },
//   { id: "ojolali", name: "Ojolali", latitude: -7.3000, longitude: 110.8000, country: "Indonesia" },
//   // CONTINUE ADDING CITIES HERE
// ]

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
