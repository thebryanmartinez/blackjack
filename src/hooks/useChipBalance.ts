import { CHIP_BALANCE } from '@/constants'
import { useEffect } from 'react'

export const useChipBalance = () => {
  const chipBalance = localStorage.getItem(CHIP_BALANCE || '0')

  const updateChipBalance = (newBalance: string | number) => {
    localStorage.setItem(CHIP_BALANCE, newBalance.toString())
  }

  const getChipBalance = () => {
    return Number(localStorage.getItem(CHIP_BALANCE))
  }

  useEffect(() => {
    if (!chipBalance || chipBalance === '0') {
      localStorage.setItem(CHIP_BALANCE, '500')
    }
  }, [chipBalance])

  return {
    updateChipBalance,
    getChipBalance
  }
}
