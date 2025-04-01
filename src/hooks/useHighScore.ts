import { HIGH_SCORE } from '@/constants'
import { useEffect } from 'react'

export const useHighScore = () => {
  const highScore = localStorage.getItem(HIGH_SCORE || '0')

  const updateHighScore = (newBalance: string | number) => {
    localStorage.setItem(HIGH_SCORE, newBalance.toString())
  }

  useEffect(() => {
    if (localStorage.getItem(HIGH_SCORE) === null) {
      localStorage.setItem(HIGH_SCORE, '0')
    }
  }, [])

  return {
    updateHighScore,
    highScore
  }
}
