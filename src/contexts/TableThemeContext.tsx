import { createContext, ReactNode, useContext, useState } from 'react'
import { useTableColor } from '@/hooks'

const TableColorContext = createContext({
  tableColor: '',
  toggleTableColor: () => {}
})

export const TableThemeProvider = ({ children }: { children: ReactNode }) => {
  const { updateTableColor, color } = useTableColor()
  const [tableColor, setTableColor] = useState(color || 'bg-table-green')

  const colors = ['bg-table-green', 'bg-table-blue', 'bg-table-purple']

  const toggleTableColor = () => {
    setTableColor((prevColor) => {
      const currentIndex = colors.indexOf(prevColor)
      const nextIndex = (currentIndex + 1) % colors.length
      updateTableColor(colors[nextIndex])
      return colors[nextIndex]
    })
  }

  return (
    <TableColorContext.Provider value={{ tableColor, toggleTableColor }}>
      {children}
    </TableColorContext.Provider>
  )
}

export const useTableTheme = () => {
  return useContext(TableColorContext)
}
