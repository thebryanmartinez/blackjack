import { TABLE_COLOR } from '@/constants'
import { useLayoutEffect } from 'react'

export const useTableColor = () => {
  const color = localStorage.getItem(TABLE_COLOR)

  const updateTableColor = (color: string) => {
    localStorage.setItem(TABLE_COLOR, color)
  }

  useLayoutEffect(() => {
    if (!localStorage.getItem(TABLE_COLOR)) {
      localStorage.setItem(TABLE_COLOR, 'bg-table-green')
    }
  }, [color])

  return {
    color,
    updateTableColor
  }
}
