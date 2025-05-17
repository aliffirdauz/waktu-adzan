"use client"

import { useState, useEffect } from "react"
import type { PrayerTimes } from "@/services/adhan-api"
import { formatTime } from "@/utils/date-utils"
import PrayerCountdown from "./prayer-countdown"

interface PrayerTimesTableProps {
  prayerTimes: PrayerTimes | null
  isLoading: boolean
}

export default function PrayerTimesTable({ prayerTimes, isLoading }: PrayerTimesTableProps) {
  const [nextPrayerIndex, setNextPrayerIndex] = useState<number>(-1)

  useEffect(() => {
    if (!prayerTimes) return

    // Determine which prayer is next
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

      // Convert prayer times to minutes since midnight for comparison
      const prayerMinutes = prayerInfo.map((prayer) => {
        const [hours, minutes] = prayer.time.split(":").map(Number)
        return hours * 60 + minutes
      })

      // Find the next prayer (first one that's later than current time)
      const nextIndex = prayerMinutes.findIndex((time) => time > currentTime)
      setNextPrayerIndex(nextIndex !== -1 ? nextIndex : -1)
    }

    determineNextPrayer()

    // Update next prayer every minute
    const interval = setInterval(determineNextPrayer, 60000)

    return () => clearInterval(interval)
  }, [prayerTimes])

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (!prayerTimes) {
    return (
      <div className="w-full max-w-2xl text-center p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
        Tidak dapat memuat jadwal sholat. Silakan coba lagi nanti.
      </div>
    )
  }

  const prayerInfo = [
    { time: prayerTimes.fajr, name: "Subuh" },
    { time: prayerTimes.dhuhr, name: "Dzuhur" },
    { time: prayerTimes.asr, name: "Ashar" },
    { time: prayerTimes.maghrib, name: "Maghrib" },
    { time: prayerTimes.isha, name: "Isya" },
  ]

  return (
    <table className="w-full max-w-2xl border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-800">
          <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Waktu</th>
          <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Jadwal</th>
          <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Countdown</th>
        </tr>
      </thead>
      <tbody>
        {prayerInfo.map((prayer, index) => (
          <tr
            key={index}
            className={`border-b border-gray-300 dark:border-gray-700 ${
              index === nextPrayerIndex ? "bg-green-50 dark:bg-green-900/10" : ""
            }`}
          >
            <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{formatTime(prayer.time)}</td>
            <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{prayer.name}</td>
            <td className="px-4 py-2">
              <PrayerCountdown prayerTime={prayer.time} isNext={index === nextPrayerIndex} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
