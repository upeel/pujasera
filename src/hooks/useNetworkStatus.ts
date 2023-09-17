import { useState, useEffect } from 'react'

function useNetworkStatus() {
  const [isNetworkOnline, setIsNetworkOnline] = useState<boolean>(navigator.onLine)

  useEffect(() => {
    const handleStatusChange = (status:boolean) => {
      setIsNetworkOnline(status)
    }
    window.addEventListener('online', () => handleStatusChange(true))

    window.addEventListener('offline', () => handleStatusChange(false))

    return () => {
      window.removeEventListener('online', () => handleStatusChange(true))
      window.removeEventListener('offline', () => handleStatusChange(false))
    }
  }, [])

  return { isNetworkOnline }
}

export default useNetworkStatus
