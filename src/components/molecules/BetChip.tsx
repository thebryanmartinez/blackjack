import { Typography } from '@components/atoms'
import { Coin } from '@assets/index'

interface BetChipProps {
  bet: number
  onClick: () => void
  disabled?: boolean
}

export const BetChip = ({ bet, onClick, disabled }: BetChipProps) => {
  return (
    <div
      className='relative w-16'
      role='button'
      onClick={!disabled ? onClick : undefined}
    >
      <Typography
        variant='h1'
        className='absolute left-[50%] top-[50%] -translate-x-2/4 -translate-y-2/4 text-xl text-black'
      >
        {bet}
      </Typography>
      <img
        src={Coin}
        alt='coin'
        className='w-full'
      />
    </div>
  )
}
