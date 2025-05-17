// services/in-app-notification-service.ts

import type { PrayerTimes } from "./adhan-api"

// Check if a prayer time is approaching within the next X minutes
export function checkUpcomingPrayers(
  prayerTimes: PrayerTimes,
  minutesThreshold: number,
): { name: string; time: string } | null {
  if (!prayerTimes) return null

  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const prayers = [
    { key: "fajr", name: "Subuh", time: prayerTimes.fajr },
    { key: "dhuhr", name: "Dzuhur", time: prayerTimes.dhuhr },
    { key: "asr", name: "Ashar", time: prayerTimes.asr },
    { key: "maghrib", name: "Maghrib", time: prayerTimes.maghrib },
    { key: "isha", name: "Isya", time: prayerTimes.isha },
  ]

  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(":").map(Number)
    const prayerMinutes = hours * 60 + minutes

    // If prayer time is in the future and within the threshold
    const minutesUntilPrayer = prayerMinutes - currentMinutes
    if (minutesUntilPrayer > 0 && minutesUntilPrayer <= minutesThreshold) {
      return { name: prayer.name, time: prayer.time }
    }
  }

  return null
}

// Format time for display (remove leading zero if present)
export function formatTimeForDisplay(time: string): string {
  if (time.startsWith("0")) {
    return time.substring(1)
  }
  return time
}
