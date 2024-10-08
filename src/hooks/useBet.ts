import { CURRENT_BET_KEY } from '@/constants'

export const useBet = () => {
  const currentBet = sessionStorage.getItem(CURRENT_BET_KEY)

  const updateCurrentBet = (newBet: number | string) => {
    sessionStorage.setItem(CURRENT_BET_KEY, newBet.toString())
  }

  return {
    currentBet,
    updateCurrentBet
  }
}
