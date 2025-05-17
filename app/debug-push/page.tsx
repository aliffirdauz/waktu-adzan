'use client'

import { useState } from 'react'

// 🔑 Replace with your actual VAPID public key or from env if already injected
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)))
}

export default function DebugPushPage() {
  const [logs, setLogs] = useState<string[]>([])

  const log = (msg: string) => {
    console.log(msg)
    setLogs((prev) => [...prev, msg])
  }

  const handleTest = async () => {
    log("🔔 Step 1: Button clicked")

    try {
      const permission = await Notification.requestPermission()
      log("🔒 Step 2: Permission = " + permission)
    } catch (err: any) {
      log("❌ Error in Notification.requestPermission: " + err.message || err)
      return
    }

    try {
      await navigator.serviceWorker.register("/sw.js")
      log("⚙️ Step 3: Service worker registered")
    } catch (err: any) {
      log("❌ Error registering SW: " + err.message || err)
      return
    }

    try {
      const ready = await navigator.serviceWorker.ready
      log("✅ Step 4: SW is ready")

      const subscription = await ready.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      })

      log("📬 Step 5: Subscribed to push!")
      console.log("✅ Subscription object:", subscription)
    } catch (err: any) {
      log("❌ Error subscribing to push: " + err.message || err)
    }
  }

  return (
    <div className="p-4 font-mono text-sm">
      <h1 className="text-lg font-bold text-blue-700 mb-4">🔍 Push Debug Page</h1>
      <button
        onClick={handleTest}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        🔔 Test Push Subscription
      </button>

      <div className="mt-6 bg-gray-900 text-green-300 p-4 rounded max-h-64 overflow-y-auto">
        {logs.map((msg, i) => (
          <div key={i}>• {msg}</div>
        ))}
      </div>
    </div>
  )
}
