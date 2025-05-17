import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jadwal Adzan",
  description: "Aplikasi jadwal adzan dan waktu sholat di seluruh Indonesia",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const [errorLog, setErrorLog] = useState<string | null>(null)

  useEffect(() => {
    window.addEventListener('error', (e) => {
      setErrorLog(`🔥 Uncaught error: ${e.message}`)
    })

    window.addEventListener('unhandledrejection', (e) => {
      setErrorLog(`🔥 Unhandled Promise rejection: ${e.reason}`)
    })
  }, [])

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          {errorLog && (
            <div className="fixed bottom-0 left-0 right-0 bg-red-700 text-white text-xs p-2 font-mono z-50">
              {errorLog}
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
