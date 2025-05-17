// Date utility functions

export function formatDate(date: Date): string {
  // Format: DD-MM-YYYY
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

export function formatTime(time: string): string {
  // Convert 24-hour format to 12-hour format with AM/PM
  const [hours, minutes] = time.split(":")
  const hour = Number.parseInt(hours, 10)
  const ampm = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

export function getCurrentDateFormatted(): string {
  return formatDate(new Date())
}

export function formatDateForInput(date: Date): string {
  // Format: YYYY-MM-DD for input[type="date"]
  return date.toISOString().split("T")[0]
}
