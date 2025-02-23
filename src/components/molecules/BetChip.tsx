import { Typography } from '@components/atoms'

interface BetChipProps {
  bet: number
  onClick: () => void
  disabled?: boolean
  image: string
}

export const BetChip = ({ bet, onClick, disabled, image }: BetChipProps) => {
  return (
    <div
      className='nes-pointer relative w-16'
      role='button'
      onClick={!disabled ? onClick : undefined}
    >
      <Typography
        variant='h1'
        className='text-stroke absolute left-[45%] top-[50%] -translate-x-2/4 -translate-y-2/4 text-xl !text-white'
      >
        {bet}
      </Typography>
      <img
        src={image}
        alt='chip'
        className='w-full'
      />
    </div>
  )
}
