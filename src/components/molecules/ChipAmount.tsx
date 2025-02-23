import ChipsSmall from '@/assets/chips/chipsSmall.png'
import ChipsMedium from '@/assets/chips/chipsMedium.png'
import ChipsFull from '@/assets/chips/chipsFull.png'
import ChipsBig from '@/assets/chips/chipsBig.png'
import ChipsBigger from '@/assets/chips/chipsBigger.png'
import { Container, Typography } from '../atoms'
import { useMemo } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipContentProps
} from '@radix-ui/react-tooltip'

interface ChipAmountProps {
  amount: number
  imagePosition?: 'left' | 'right'
  border?: boolean
  scale?: number
  tooltipSide?: TooltipContentProps['side']
  tooltipText?: string
}

const ChipAmount = ({
  amount,
  imagePosition = 'right',
  border = true,
  scale = 1,
  tooltipSide,
  tooltipText
}: ChipAmountProps) => {
  const chipImage = () =>
    useMemo(() => {
      if (amount < 100) {
        return ChipsSmall
      } else if (amount < 500) {
        return ChipsMedium
      } else if (amount < 1000) {
        return ChipsFull
      } else if (amount < 2000) {
        return ChipsBig
      } else {
        return ChipsBigger
      }
    }, [amount])

  const borderStyle = border ? '' : '!border-none !p-0'
  const scaleStyle = scale ? `scale-${scale}` : ''
  const balloonStyle = tooltipSide === 'right' ? 'from-left' : 'from-right'

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`flex w-fit items-center justify-center gap-4 ${borderStyle} ${scaleStyle}`}
          >
            {imagePosition === 'left' && (
              <img
                className='w-12 object-contain'
                src={chipImage()}
                alt='Chips image'
              />
            )}
            <Typography
              variant='h1'
              className='text-2xl'
            >
              {amount}
            </Typography>
            {imagePosition === 'right' && (
              <img
                className='w-12 object-contain'
                src={chipImage()}
                alt='Chips image'
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side={tooltipSide}>
          <div className={`nes-balloon ${balloonStyle}`}>{tooltipText}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ChipAmount
