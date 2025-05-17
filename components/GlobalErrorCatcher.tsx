'use client'

import { useEffect, useState } from 'react'

export default function GlobalErrorCatcher() {
    const [errorLog, setErrorLog] = useState<string | null>(null)

    useEffect(() => {
        window.addEventListener('error', (e) => {
            setErrorLog(`🔥 Uncaught error: ${e.message}`)
        })

        window.addEventListener('unhandledrejection', (e) => {
            setErrorLog(`🔥 Unhandled Promise rejection: ${e.reason}`)
        })
    }, [])

    if (!errorLog) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-red-700 text-white text-xs p-2 font-mono z-50">
            {errorLog}
        </div>
    )
}
