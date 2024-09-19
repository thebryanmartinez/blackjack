import { ReactNode } from '@tanstack/react-router'

interface PlayerLayoutProps {
  children: ReactNode
}

export const PlayerLayout = ({ children }: PlayerLayoutProps) => {
  return (
    <section className='flex flex-1 flex-col items-center'>{children}</section>
  )
}
