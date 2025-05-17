// Time utility functions

// Convert time string (HH:MM) to minutes since midnight
export function timeToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(":").map(Number)
  return hours * 60 + minutes
}

// Get current time in minutes since midnight
export function getCurrentTimeInMinutes(): number {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes()
}

// Format minutes to HH:MM
export function minutesToTimeString(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
}

// Calculate time difference in minutes
export function getTimeDifference(time1: string, time2: string): number {
  return timeToMinutes(time2) - timeToMinutes(time1)
}

// Format time difference to human-readable string
export function formatTimeDifference(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours > 0) {
    return `${hours} jam ${mins} menit`
  }
  return `${mins} menit`
}
