import { createFileRoute } from '@tanstack/react-router'
import { Layout, Typography, Button, Container } from '@components/atoms'
import { useNavigate } from '@tanstack/react-router'
import { Routes } from '@/constants'
import { useState } from 'react'
import { BetChip, BetDisplay } from '@components/molecules'
import { useBet, useChipBalance } from '@/hooks'
import BlackChip from '@/assets/chips/chipBlack.png'
import RedChip from '@/assets/chips/chipRed.png'
import GreenChip from '@/assets/chips/chipGreen.png'
import BlueChip from '@/assets/chips/chipBlue.png'
import ChipsMedium from '@/assets/chips/chipsMedium.png'
import ChipAmount from '@/components/molecules/ChipAmount'

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
  const [bet, setBet] = useState<number>(0)
  const navigate = useNavigate({ from: Routes.BET })

  const { getChipBalance, updateChipBalance } = useChipBalance()
  const { updateCurrentBet } = useBet()
  const currentChipBalance = getChipBalance()

  const clearBet = () => {
    setBet(0)
  }

  const navigateToPlay = () => {
    updateCurrentBet(bet)
    updateChipBalance(currentChipBalance - bet)
    navigate({ to: Routes.PLAY })
  }

  return (
    <Layout className='flex flex-col justify-between'>
      <div className='flex w-full justify-end'>
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
          text='Play'
          onClick={navigateToPlay}
          className='is-primary w-full md:w-1/3'
          disabled={bet === 0}
        />
      </div>
    </Layout>
  )
}

export const Route = createFileRoute(Routes.BET)({
  component: Bet
})
