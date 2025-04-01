import { useTableTheme } from '@/contexts'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export const Layout = ({ children, className }: LayoutProps) => {
  const { tableColor } = useTableTheme()

  return (
    <main className={`h-dvh p-4 md:p-8 lg:p-12 ${className} ${tableColor}`}>
      {children}
    </main>
  )
}
