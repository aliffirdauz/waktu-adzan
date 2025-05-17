// Notification service for prayer times

export interface NotificationPreference {
  enabled: boolean
  prayers: {
    fajr: boolean
    dhuhr: boolean
    asr: boolean
    maghrib: boolean
    isha: boolean
  }
  minutesBefore: number
}

// Default notification preferences
export const defaultNotificationPreference: NotificationPreference = {
  enabled: false,
  prayers: {
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
  },
  minutesBefore: 10,
}

// Check if notifications are supported in this browser
export function isNotificationSupported() {
  console.log("SW support:", "serviceWorker" in navigator)
  console.log("PushManager support:", "PushManager" in window)
  console.log("Notification support:", "Notification" in window)

  return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window
}


// Request notification permission
export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) {
    return false
  }

  if (Notification.permission === "granted") {
    return true
  }

  if (Notification.permission === "denied") {
    return false
  }

  const permission = await Notification.requestPermission()
  return permission === "granted"
}

// Send a notification
export function sendNotification(title: string, options?: NotificationOptions): Notification | null {
  if (!isNotificationSupported() || Notification.permission !== "granted") {
    return null
  }

  return new Notification(title, options)
}

// Save notification preferences to localStorage
export function saveNotificationPreferences(preferences: NotificationPreference): void {
  try {
    localStorage.setItem("adzan_notification_preferences", JSON.stringify(preferences))
  } catch (error) {
    console.error("Failed to save notification preferences:", error)
  }
}

// Load notification preferences from localStorage
export function loadNotificationPreferences(): NotificationPreference {
  try {
    const savedPreferences = localStorage.getItem("adzan_notification_preferences")
    if (savedPreferences) {
      return JSON.parse(savedPreferences) as NotificationPreference
    }
  } catch (error) {
    console.error("Failed to load notification preferences:", error)
  }
  return { ...defaultNotificationPreference }
}

// Schedule notifications for prayer times
export function scheduleNotifications(
  prayerTimes: { [key: string]: string },
  preferences: NotificationPreference,
): void {
  if (!preferences.enabled || !isNotificationSupported() || Notification.permission !== "granted") {
    return
  }

  // Clear any existing notification timers
  clearNotificationTimers()

  const now = new Date()
  const timers: NodeJS.Timeout[] = []

  // Prayer names mapping
  const prayerNames: { [key: string]: string } = {
    fajr: "Subuh",
    dhuhr: "Dzuhur",
    asr: "Ashar",
    maghrib: "Maghrib",
    isha: "Isya",
  }

  // Schedule notifications for each prayer time
  Object.entries(preferences.prayers).forEach(([prayer, enabled]) => {
    if (!enabled) return

    const prayerTime = prayerTimes[prayer]
    if (!prayerTime) return

    const [hours, minutes] = prayerTime.split(":").map(Number)
    const prayerDate = new Date(now)
    prayerDate.setHours(hours, minutes, 0, 0)

    // Calculate notification time (X minutes before prayer time)
    const notificationTime = new Date(prayerDate)
    notificationTime.setMinutes(notificationTime.getMinutes() - preferences.minutesBefore)

    // Skip if the notification time has already passed
    if (notificationTime <= now) return

    // Calculate delay in milliseconds
    const delay = notificationTime.getTime() - now.getTime()

    // Schedule notification
    const timer = setTimeout(() => {
      sendNotification(`Waktu ${prayerNames[prayer]} dalam ${preferences.minutesBefore} menit`, {
        body: `Bersiap untuk sholat ${prayerNames[prayer]}`,
        icon: "/icons/favicon.ico",
        badge: "/icons/favicon.ico",
      })
    }, delay)

    timers.push(timer)
  })

  // Store timers in window object for later cleanup
  window.__notificationTimers = timers
}

// Clear all notification timers
export function clearNotificationTimers(): void {
  if (typeof window !== "undefined" && window.__notificationTimers) {
    window.__notificationTimers.forEach(clearTimeout)
    window.__notificationTimers = []
  }
}

// Declare global window interface
declare global {
  interface Window {
    __notificationTimers: NodeJS.Timeout[]
  }
}

// Initialize notification timers array
if (typeof window !== "undefined") {
  window.__notificationTimers = window.__notificationTimers || []
}
