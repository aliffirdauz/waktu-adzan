// AlAdhan API service

export interface PrayerTimes {
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  sunset: string
  maghrib: string
  isha: string
  imsak: string
  midnight: string
  date: {
    readable: string
    timestamp: string
    hijri: {
      date: string
      format: string
      day: string
      month: {
        number: number
        en: string
        ar: string
      }
      year: string
    }
    gregorian: {
      date: string
      format: string
      day: string
      month: {
        number: number
        en: string
      }
      year: string
      designation: {
        abbreviated: string
        expanded: string
      }
    }
  }
  meta: {
    latitude: number
    longitude: number
    timezone: string
    method: {
      id: number
      name: string
      params: {
        Fajr: number
        Isha: number
      }
    }
    latitudeAdjustmentMethod: string
    midnightMode: string
    school: string
    offset: {
      Imsak: number
      Fajr: number
      Sunrise: number
      Dhuhr: number
      Asr: number
      Maghrib: number
      Sunset: number
      Isha: number
      Midnight: number
    }
  }
}

export interface TimingResponse {
  code: number
  status: string
  data: {
    timings: {
      Fajr: string
      Sunrise: string
      Dhuhr: string
      Asr: string
      Sunset: string
      Maghrib: string
      Isha: string
      Imsak: string
      Midnight: string
    }
    date: {
      readable: string
      timestamp: string
      gregorian: {
        date: string
        format: string
        day: string
        weekday: {
          en: string
        }
        month: {
          number: number
          en: string
        }
        year: string
        designation: {
          abbreviated: string
          expanded: string
        }
      }
      hijri: {
        date: string
        format: string
        day: string
        weekday: {
          en: string
          ar: string
        }
        month: {
          number: number
          en: string
          ar: string
        }
        year: string
        designation: {
          abbreviated: string
          expanded: string
        }
        holidays: string[]
      }
    }
    meta: {
      latitude: number
      longitude: number
      timezone: string
      method: {
        id: number
        name: string
        params: {
          Fajr: number
          Isha: number
        }
      }
      latitudeAdjustmentMethod: string
      midnightMode: string
      school: string
      offset: {
        Imsak: number
        Fajr: number
        Sunrise: number
        Dhuhr: number
        Asr: number
        Maghrib: number
        Sunset: number
        Isha: number
        Midnight: number
      }
    }
  }
}

export async function getPrayerTimesByCoordinates(
  latitude: number,
  longitude: number,
  date: string,
  method = 20, // Default to KEMENAG method
): Promise<PrayerTimes | null> {
  console.log("Fetching prayer times for coordinates:", latitude, longitude, date)
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=${method}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch prayer times")
    }

    const data: TimingResponse = await response.json()

    // Transform the response to our PrayerTimes interface
    return {
      fajr: data.data.timings.Fajr,
      sunrise: data.data.timings.Sunrise,
      dhuhr: data.data.timings.Dhuhr,
      asr: data.data.timings.Asr,
      sunset: data.data.timings.Sunset,
      maghrib: data.data.timings.Maghrib,
      isha: data.data.timings.Isha,
      imsak: data.data.timings.Imsak,
      midnight: data.data.timings.Midnight,
      date: data.data.date,
      meta: data.data.meta,
    }
  } catch (error) {
    console.error("Error fetching prayer times:", error)
    return null
  }
}

export async function getPrayerTimesByCity(
  city: string,
  country: string,
  date: string,
  method = 3,
): Promise<PrayerTimes | null> {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity/${date}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch prayer times")
    }

    const data: TimingResponse = await response.json()

    // Transform the response to our PrayerTimes interface
    return {
      fajr: data.data.timings.Fajr,
      sunrise: data.data.timings.Sunrise,
      dhuhr: data.data.timings.Dhuhr,
      asr: data.data.timings.Asr,
      sunset: data.data.timings.Sunset,
      maghrib: data.data.timings.Maghrib,
      isha: data.data.timings.Isha,
      imsak: data.data.timings.Imsak,
      midnight: data.data.timings.Midnight,
      date: data.data.date,
      meta: data.data.meta,
    }
  } catch (error) {
    console.error("Error fetching prayer times:", error)
    return null
  }
}
