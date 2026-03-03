import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@components/atoms'
import { Button } from '@/components/ui/pixelact-ui/button'
import { useNavigate } from '@tanstack/react-router'
import { CURRENT_BET_KEY, Routes } from '@/constants'
import { useState } from 'react'
import { BetChip, BetDisplay, ChipAmount } from '@components/molecules'
import { useBet, useChipBalance } from '@/hooks'
import BlackChip from '@/assets/chips/chipBlack.png'
import RedChip from '@/assets/chips/chipRed.png'
import GreenChip from '@/assets/chips/chipGreen.png'
import BlueChip from '@/assets/chips/chipBlue.png'
import { useTranslation } from 'react-i18next'

const CHIPS = [
  {
    value: 5,
    image: RedChip
  },
  {
    value: 10,
    image: BlueChip
  },
  {
    value: 25,
    image: GreenChip
  },
  {
    value: 100,
    image: BlackChip
  }
]

const Bet = () => {
  const [bet, setBet] = useState<number>(
    Number(sessionStorage.getItem(CURRENT_BET_KEY) || 0)
  )
  const navigate = useNavigate({ from: Routes.BET })

  const { getChipBalance, updateChipBalance } = useChipBalance()
  const { updateCurrentBet } = useBet()
  const currentChipBalance = getChipBalance()
  const { t } = useTranslation()

  const clearBet = () => {
    setBet(0)
  }

  const navigateToPlay = () => {
    updateCurrentBet(bet)
    updateChipBalance(currentChipBalance - bet)
    navigate({ to: Routes.PLAY })
  }

  const navigateToHome = () => {
    navigate({ to: Routes.HOME })
  }

  return (
    <Layout className='flex flex-col justify-between'>
      <div className='flex w-full items-center justify-between'>
        <Button
          className='!pl-3 !pr-3'
          onClick={navigateToHome}
        >
          {'<'}
        </Button>
        <ChipAmount amount={currentChipBalance - bet} />
      </div>
      <BetDisplay
        bet={bet}
        clearBet={clearBet}
      />
      <div className='flex w-full flex-col gap-4 md:items-center'>
        <div className='flex items-center justify-between gap-4 pb-4 md:w-1/2 '>
          {CHIPS.map(({ value, image }) => (
            <BetChip
              bet={value}
              key={value}
              onClick={() => setBet(bet + value)}
              disabled={bet + value > currentChipBalance}
              image={image}
            />
          ))}
        </div>

        <Button
          variant='default'
          onClick={navigateToPlay}
          className='w-full md:w-1/3'
          disabled={bet === 0}
        >
          {t('bet.buttons.play')}
        </Button>
      </div>
    </Layout>
  )
}

export const Route = createFileRoute(Routes.BET)({
  component: Bet
})
