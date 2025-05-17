"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-5 w-5 absolute transition-all duration-300 ${
          theme === "dark" ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"
        } text-yellow-500`}
      />
      <Moon
        className={`h-5 w-5 absolute transition-all duration-300 ${
          theme === "dark" ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        } text-blue-400`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
