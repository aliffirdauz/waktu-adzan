"use client"

import { useState, useEffect } from "react"

interface PrayerCountdownProps {
  prayerTime: string // Format: "HH:MM"
  isNext: boolean
}

export default function PrayerCountdown({ prayerTime, isNext }: PrayerCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("")
  const [isPassed, setIsPassed] = useState<boolean>(false)

  useEffect(() => {
    // Function to calculate time remaining
    const calculateTimeRemaining = () => {
      const now = new Date()
      const [hours, minutes] = prayerTime.split(":").map(Number)

      const prayerDate = new Date(now)
      prayerDate.setHours(hours, minutes, 0, 0)

      // If prayer time has passed for today
      if (prayerDate < now) {
        setIsPassed(true)
        return "Telah lewat"
      }

      setIsPassed(false)

      // Calculate difference in milliseconds
      const diff = prayerDate.getTime() - now.getTime()

      // Convert to hours, minutes, seconds
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60))
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000)

      // Format the time remaining
      return `${hoursLeft.toString().padStart(2, "0")}:${minutesLeft
        .toString()
        .padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`
    }

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining())

    // Update every second
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining())
    }, 1000)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [prayerTime])

  return (
    <div className="flex items-center">
      {isNext && !isPassed && (
        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
      )}
      <span
        className={`${
          isPassed
            ? "text-gray-400 dark:text-gray-500"
            : isNext
              ? "font-medium text-green-600 dark:text-green-400"
              : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {isPassed ? "Telah lewat" : `${timeRemaining}`}
      </span>
    </div>
  )
}
