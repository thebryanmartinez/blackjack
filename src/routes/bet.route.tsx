import { createFileRoute } from '@tanstack/react-router'
import { Layout, Typography, Container, Button } from '@components/atoms'
import { useNavigate } from '@tanstack/react-router'
import { Routes, strings } from '@/constants'
import { useState } from 'react'
import { BetChip, BetDisplay } from '@components/molecules'
import { useBet, useChipBalance } from '@/hooks'

const chips = [5, 10, 25, 100]

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
      <div className='flex items-center justify-end'>
        <Typography
          variant='h1'
          className='text-xl'
        >
          {currentChipBalance - bet}
        </Typography>
      </div>
      <BetDisplay
        bet={bet}
        clearBet={clearBet}
      />
      <div>
        <div className='flex items-center justify-between gap-4 pb-4'>
          {chips.map((chip: number) => (
            <BetChip
              bet={chip}
              key={chip}
              onClick={() => setBet(bet + chip)}
              disabled={bet + chip > currentChipBalance}
            />
          ))}
        </div>

        <div className='flex items-center justify-between gap-4'>
          <Button
            text='Play'
            onClick={navigateToPlay}
            className='is-primary w-full'
            disabled={bet === 0}
          />
          <Button
            text='Cancel'
            onClick={navigateToPlay}
            className='w-full'
          />
        </div>
      </div>
    </Layout>
  )
}

export const Route = createFileRoute(Routes.BET)({
  component: Bet
})
