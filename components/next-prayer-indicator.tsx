"use client"

import { useState, useEffect } from "react"
import type { PrayerTimes } from "@/services/adhan-api"
import { formatTime } from "@/utils/date-utils"

interface NextPrayerIndicatorProps {
  prayerTimes: PrayerTimes | null
}

export default function NextPrayerIndicator({ prayerTimes }: NextPrayerIndicatorProps) {
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<string>("")

  useEffect(() => {
    if (!prayerTimes) return

    const determineNextPrayer = () => {
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()

      const prayerInfo = [
        { time: prayerTimes.fajr, name: "Subuh" },
        { time: prayerTimes.dhuhr, name: "Dzuhur" },
        { time: prayerTimes.asr, name: "Ashar" },
        { time: prayerTimes.maghrib, name: "Maghrib" },
        { time: prayerTimes.isha, name: "Isya" },
      ]

      // Convert prayer times to minutes since midnight
      for (const prayer of prayerInfo) {
        const [hours, minutes] = prayer.time.split(":").map(Number)
        const prayerMinutes = hours * 60 + minutes

        if (prayerMinutes > currentTime) {
          setNextPrayer(prayer)

          // Calculate time remaining
          const diff = prayerMinutes - currentTime
          const hoursLeft = Math.floor(diff / 60)
          const minutesLeft = diff % 60

          if (hoursLeft > 0) {
            setTimeRemaining(`${hoursLeft} jam ${minutesLeft} menit lagi`)
          } else {
            setTimeRemaining(`${minutesLeft} menit lagi`)
          }

          return
        }
      }

      // If all prayers have passed for today, show the first prayer for tomorrow
      setNextPrayer(prayerInfo[0])
      setTimeRemaining("besok")
    }

    determineNextPrayer()

    // Update every minute
    const interval = setInterval(determineNextPrayer, 60000)

    return () => clearInterval(interval)
  }, [prayerTimes])

  if (!prayerTimes || !nextPrayer) return null

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-700 dark:text-blue-400 text-center w-full max-w-2xl">
      <div className="font-medium">Waktu sholat berikutnya:</div>
      <div className="text-lg">
        {nextPrayer.name} ({formatTime(nextPrayer.time)}) - {timeRemaining}
      </div>
    </div>
  )
}
