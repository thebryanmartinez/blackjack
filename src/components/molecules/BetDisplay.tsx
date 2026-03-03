import { Typography } from '@components/atoms'
import { Button } from '@/components/ui/pixelact-ui/button'

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
        variant='default'
        className='!px-2'
        onClick={clearBet}
        disabled={bet === 0}
      >
        X
      </Button>
    </div>
  )
}
