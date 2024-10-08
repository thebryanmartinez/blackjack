import { Button, Typography } from '@components/atoms'

interface BetDisplayProps {
  bet: number
  clearBet: () => void
}

export const BetDisplay = ({ bet, clearBet }: BetDisplayProps) => {
  return (
    <div className='flex items-center justify-end gap-4'>
      <Typography
        variant='h1'
        className='text-center text-6xl'
      >
        {bet}
      </Typography>
      <Button
        className='!px-2'
        text='X'
        onClick={clearBet}
        disabled={bet === 0}
      />
    </div>
  )
}
