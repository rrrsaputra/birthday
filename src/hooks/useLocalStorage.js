import { useEffect, useState } from 'react'

/**
 * useState that persists to localStorage (safe if storage is unavailable).
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage might be blocked — that's okay */
    }
  }, [key, value])

  return [value, setValue]
}
