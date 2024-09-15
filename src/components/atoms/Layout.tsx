import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <main className={`bg-table-green h-dvh p-4 md:p-8 lg:p-12 ${className}`}>
      {children}
    </main>
  )
}
