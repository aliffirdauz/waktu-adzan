"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { type PrayerTimes, getPrayerTimesByCoordinates } from "@/services/adhan-api"
import type { Location } from "@/services/location-service"
import { formatDateForInput, formatDate } from "@/utils/date-utils"
import PrayerTimesTable from "@/components/prayer-times-table"
import LocationSelector from "@/components/location-selector"
import { useDefaultLocation } from "@/hooks/use-default-location"
import { ThemeToggle } from "@/components/theme-toggle"
import NotificationSettings from "@/components/notification-settings"
import { loadNotificationPreferences, scheduleNotifications } from "@/services/notification-service"
import NextPrayerIndicator from "@/components/next-prayer-indicator"
import PrayerNotificationHandler from "@/components/prayer-notification-handler"

export default function Home() {
  const [date, setDate] = useState<string>(formatDateForInput(new Date()))
  const {
    location: selectedLocation,
    isLoading: locationLoading,
    setLocation: setSelectedLocation,
  } = useDefaultLocation()
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (selectedLocation) {
      fetchPrayerTimes()
    }
  }, [selectedLocation, date])

  // Schedule notifications when prayer times change
  useEffect(() => {
    if (prayerTimes && typeof window !== "undefined") {
      const preferences = loadNotificationPreferences()
      if (preferences.enabled) {
        scheduleNotifications(
          {
            fajr: prayerTimes.fajr,
            dhuhr: prayerTimes.dhuhr,
            asr: prayerTimes.asr,
            maghrib: prayerTimes.maghrib,
            isha: prayerTimes.isha,
          },
          preferences,
        )
      }
    }
  }, [prayerTimes])

  const fetchPrayerTimes = async () => {
    if (!selectedLocation) return

    setIsLoading(true)
    setError(null)

    try {
      // Convert YYYY-MM-DD to DD-MM-YYYY for AlAdhan API
      const formattedDate = formatDate(new Date(date))

      const times = await getPrayerTimesByCoordinates(
        selectedLocation.latitude,
        selectedLocation.longitude,
        formattedDate,
      )

      setPrayerTimes(times)
    } catch (err) {
      console.error("Error fetching prayer times:", err)
      setError("Gagal memuat jadwal sholat. Silakan coba lagi nanti.")
      setPrayerTimes(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLocationChange = (location: Location) => {
    setSelectedLocation(location)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  // Check if selected date is today
  const isToday = () => {
    const today = new Date()
    const selectedDate = new Date(date)
    return (
      today.getDate() === selectedDate.getDate() &&
      today.getMonth() === selectedDate.getMonth() &&
      today.getFullYear() === selectedDate.getFullYear()
    )
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Prayer notification handler (invisible component) */}
      <PrayerNotificationHandler prayerTimes={prayerTimes} isToday={isToday()} />

      {/* Header with controls - fixed position for all screen sizes */}
      <div className="w-full flex justify-end items-center py-2 px-4 mb-4 z-10">
        <div className="flex items-center gap-2 sm:gap-4">
          <NotificationSettings />
          <ThemeToggle />
        </div>
      </div>

      <main className="flex flex-col gap-6 sm:gap-8 row-start-2 items-center sm:items-center w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center">Jadwal Adzan</h1>
        <p className="text-base sm:text-lg text-center text-gray-700 dark:text-gray-300">
          Aplikasi ini menampilkan jadwal adzan dan waktu sholat di seluruh Indonesia.
          <br className="hidden sm:block" />
          Anda dapat menggunakan aplikasi ini untuk mengetahui waktu sholat di lokasi Anda.
        </p>

        {typeof window !== "undefined" &&
          !window.matchMedia("(display-mode: standalone)").matches && (
            <div className="bg-yellow-200 text-yellow-800 p-2 text-sm text-center">
              🚀 Untuk pengalaman penuh, tambahkan aplikasi ke Home Screen dari Browser anda.
            </div>
          )}

        {locationLoading ? (
          <div className="w-full max-w-2xl text-center p-4">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ) : (
          <>
            {selectedLocation && (
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-green-700 dark:text-green-400 text-center w-full max-w-2xl">
                Menampilkan jadwal sholat untuk {selectedLocation.name}, Indonesia
              </div>
            )}

            {/* Show next prayer indicator only if date is today */}
            {prayerTimes && isToday() && <NextPrayerIndicator prayerTimes={prayerTimes} />}

            <div className="flex flex-col sm:flex-row gap-6 items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg w-full max-w-2xl">
              <div className="flex flex-col gap-2 items-center w-full sm:w-auto">
                <label htmlFor="date" className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-400">
                  Pilih Tanggal
                </label>
                <input
                  type="date"
                  id="date"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2 w-full max-w-xs text-gray-700 dark:text-gray-300"
                  value={date}
                  onChange={handleDateChange}
                />
              </div>

              <LocationSelector selectedLocation={selectedLocation} onLocationChange={handleLocationChange} />
            </div>
          </>
        )}

        <div className="flex flex-col gap-4 items-center w-full">
          {error && (
            <div className="w-full max-w-2xl text-center p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          <PrayerTimesTable prayerTimes={prayerTimes} isLoading={isLoading} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          href="https://alifporto.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <h5 className="text-sm sm:text-base font-semibold">Made with ❤️ by Alif</h5>
        </a>
      </footer>
    </div>
  )
}
