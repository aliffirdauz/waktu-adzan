"use client"

import { useEffect, useRef, useState } from "react"
import type { PrayerTimes } from "@/services/adhan-api"
import { checkUpcomingPrayers } from "@/services/in-app-notification-service"

interface PrayerNotificationHandlerProps {
  prayerTimes: PrayerTimes | null
  isToday: boolean
}

export default function PrayerNotificationHandler({ prayerTimes, isToday }: PrayerNotificationHandlerProps) {
  const [lastNotifiedPrayer, setLastNotifiedPrayer] = useState<string | null>(null)
  const checkInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Only check for notifications if we're looking at today's prayer times
    if (!prayerTimes || !isToday) {
      if (checkInterval.current) {
        clearInterval(checkInterval.current)
        checkInterval.current = null
      }
      return
    }

    // Function to check for upcoming prayers
    const checkForNotifications = () => {
      const upcomingPrayer = checkUpcomingPrayers(prayerTimes, 15) // Check for prayers within 15 minutes

      if (upcomingPrayer && upcomingPrayer.name !== lastNotifiedPrayer) {
        // We would show a notification here, but we've removed the toast feature
        setLastNotifiedPrayer(upcomingPrayer.name)
      }
    }

    // Check immediately on mount or when prayer times change
    checkForNotifications()

    // Set up interval to check every minute
    checkInterval.current = setInterval(checkForNotifications, 60000)

    return () => {
      if (checkInterval.current) {
        clearInterval(checkInterval.current)
        checkInterval.current = null
      }
    }
  }, [prayerTimes, isToday, lastNotifiedPrayer])

  // This is a utility component that doesn't render anything
  return null
}
