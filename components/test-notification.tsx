"use client"

import { useState } from "react"
import { sendNotification, isNotificationSupported } from "@/services/notification-service"

export default function TestNotification() {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleTestNotification = () => {
    if (!isNotificationSupported() || Notification.permission !== "granted") {
      return
    }

    sendNotification("Test Notifikasi Adzan", {
      body: "Ini adalah notifikasi uji coba. Jika Anda melihat ini, notifikasi berhasil dikonfigurasi!",
      icon: "/favicon.ico",
    })

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  if (!isNotificationSupported() || Notification.permission !== "granted") {
    return null
  }

  return (
    <div className="mt-4 text-center">
      <button onClick={handleTestNotification} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
        Uji notifikasi
      </button>
      {showSuccess && (
        <p className="text-sm text-green-600 dark:text-green-400 mt-2">Notifikasi uji coba telah dikirim!</p>
      )}
    </div>
  )
}
