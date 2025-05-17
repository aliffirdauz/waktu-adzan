"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, BellOff, AlertCircle, Check, X } from "lucide-react"
import {
  type NotificationPreference,
  defaultNotificationPreference,
  isNotificationSupported,
  requestNotificationPermission,
  saveNotificationPreferences,
  loadNotificationPreferences,
  sendNotification,
} from "@/services/notification-service"

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreference>({ ...defaultNotificationPreference })
  const [isSupported, setIsSupported] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | "unknown">("unknown")
  const [isOpen, setIsOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

  // Initialize on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const supported = isNotificationSupported()
      setIsSupported(supported)

      if (supported) {
        setPermissionStatus(Notification.permission)
        const savedPreferences = loadNotificationPreferences()
        setPreferences(savedPreferences)
      }
    }
  }, [])

  // Close settings when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Request permission handler
  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission()
    setPermissionStatus(Notification.permission)

    if (granted) {
      // Update preferences if permission was granted
      setPreferences((prev) => ({ ...prev, enabled: true }))
      saveNotificationPreferences({ ...preferences, enabled: true })
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  // Toggle notification settings panel
  const toggleSettings = () => {
    setIsOpen(!isOpen)
  }

  // Toggle master switch for notifications
  const toggleNotifications = () => {
    const newPreferences = { ...preferences, enabled: !preferences.enabled }
    setPreferences(newPreferences)
    saveNotificationPreferences(newPreferences)
  }

  // Toggle individual prayer notifications
  const togglePrayer = (prayer: keyof NotificationPreference["prayers"]) => {
    const newPreferences = {
      ...preferences,
      prayers: {
        ...preferences.prayers,
        [prayer]: !preferences.prayers[prayer],
      },
    }
    setPreferences(newPreferences)
    saveNotificationPreferences(newPreferences)
  }

  // Update minutes before prayer
  const updateMinutesBefore = (minutes: number) => {
    const newPreferences = { ...preferences, minutesBefore: minutes }
    setPreferences(newPreferences)
    saveNotificationPreferences(newPreferences)
  }

  // Test notification
  const handleTestNotification = () => {
    if (permissionStatus === "granted") {
      sendNotification("Test Notifikasi Adzan", {
        body: `Anda akan menerima notifikasi ${preferences.minutesBefore} menit sebelum waktu sholat`,
        icon: "/favicon.ico",
      })
    }
  }

  // If notifications are not supported, don't render anything
  if (!isSupported) {
    return (
      <div>
        <p className="text-sm text-red-500">
          Notifikasi tidak didukung di browser ini. Coba gunakan Chrome atau install aplikasi sebagai PWA.
        </p>
      </div>
    )
  }


  return (
    <div className="relative" ref={settingsRef}>
      {/* Notification bell button - improved visibility for mobile */}
      <button
        onClick={toggleSettings}
        className="flex items-center justify-center h-10 w-10 sm:h-10 sm:w-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
        aria-label="Pengaturan notifikasi"
      >
        {preferences.enabled ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
      </button>

      {/* Success message */}
      {showSuccess && (
        <div className="absolute top-full mt-2 right-0 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-2 rounded-md flex items-center gap-2 z-50 shadow-md">
          <Check className="h-4 w-4" />
          <span>Notifikasi diaktifkan!</span>
        </div>
      )}

      {/* Settings panel - adjusted for better mobile positioning */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-72 z-40 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Pengaturan Notifikasi</h3>
            <button
              onClick={toggleSettings}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Permission status */}
          {permissionStatus === "denied" && (
            <div className="mb-4 p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md flex items-start gap-2 text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>
                Notifikasi diblokir oleh browser. Silakan ubah pengaturan izin di browser Anda untuk mengaktifkan
                notifikasi.
              </span>
            </div>
          )}

          {permissionStatus === "default" && (
            <button
              onClick={handleRequestPermission}
              className="mb-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              Izinkan Notifikasi
            </button>
          )}

          {permissionStatus === "granted" && (
            <>
              {/* Master toggle */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Aktifkan notifikasi</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.enabled}
                    onChange={toggleNotifications}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Minutes before setting */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Ingatkan sebelum waktu sholat</label>
                <select
                  value={preferences.minutesBefore}
                  onChange={(e) => updateMinutesBefore(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  disabled={!preferences.enabled}
                >
                  <option value="5">5 menit sebelumnya</option>
                  <option value="10">10 menit sebelumnya</option>
                  <option value="15">15 menit sebelumnya</option>
                  <option value="20">20 menit sebelumnya</option>
                  <option value="30">30 menit sebelumnya</option>
                </select>
              </div>

              {/* Prayer toggles */}
              <div>
                <h4 className="text-sm font-medium mb-2">Waktu sholat</h4>
                <div className="space-y-2">
                  {Object.entries({
                    fajr: "Subuh",
                    dhuhr: "Dzuhur",
                    asr: "Ashar",
                    maghrib: "Maghrib",
                    isha: "Isya",
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm">{label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={preferences.prayers[key as keyof NotificationPreference["prayers"]]}
                          onChange={() => togglePrayer(key as keyof NotificationPreference["prayers"])}
                          disabled={!preferences.enabled}
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Test notification button */}
              <button
                onClick={handleTestNotification}
                className="mt-4 w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md text-sm"
                disabled={!preferences.enabled}
              >
                Uji Notifikasi
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
