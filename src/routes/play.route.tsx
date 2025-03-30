import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getDeckOfCards, getCard } from '@services/index'
import { Card } from '@models/index'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Layout, Loader } from '@components/atoms'
import {
  CardHand,
  GameResult,
  Score,
  PlayerActions,
  ChipAmount,
  GameFinishedDialog
} from '@components/molecules'
import { Cards, Routes, strings } from '@/constants'
import { useBet, useChipBalance, useHighScore } from '@/hooks'

const Play = () => {
  const [deckId, setDeckId] = useState<string | null>(null)
  const [playerScore, setPlayerScore] = useState<number>(0)
  const [dealerScore, setDealerScore] = useState<number>(0)
  const [gameWinnerText, setGameWinnerText] = useState<string>('')
  const [gameRestart, setGameRestart] = useState<boolean>(false)
  const [dealersTurn, setDealerTurn] = useState<boolean>(false)
  const [gameFinished, setGameFinished] = useState<boolean>(false)

  const { currentBet } = useBet()
  const { getChipBalance, updateChipBalance } = useChipBalance()
  const { highScore, updateHighScore } = useHighScore()

  const getNewCard = async (
    cards: Card[],
    setScore: (score: number) => void
  ) => {
    const newCards = [...cards]

    const newCard = await getCard(deckId!, 1)
    newCards.push(newCard[0])
    cards.push(newCard[0])
    setScore(checkCardsValue(newCards))
  }

  const getNewCardMutation = useMutation({
    mutationKey: ['hit'],
    mutationFn: ({ cards, setScore }: { cards: Card[]; setScore: any }) => {
      return getNewCard(cards, setScore)
    },
    gcTime: 0
  })

  const { data: deck, isPending: isDeckPending } = useQuery({
    queryKey: ['deck'],
    gcTime: 0,
    networkMode: 'always',
    queryFn: getDeckOfCards
  })

  const {
    data: playerCards,
    isPending: isPlayerCardsPending,
    isSuccess: isPlayerCardsSuccess,
    isRefetching: isPlayerCardsRefetching
  } = useQuery({
    queryKey: ['playerCards', gameRestart],
    queryFn: async () => {
      const cards = await getCard(deck!, 2)
      refetchDealerCards()
      return cards
    },
    gcTime: 0,
    networkMode: 'always',
    enabled: !!deck
  })

  const {
    data: dealerCards,
    isPending: isDealerCardsPending,
    isSuccess: isDealerCardsSuccess,
    isRefetching: isDealerCardsRefetching,
    refetch: refetchDealerCards
  } = useQuery({
    queryKey: ['dealerCards'],
    gcTime: 0,
    networkMode: 'always',
    queryFn: () => getCard(deck!, 2),
    enabled: false
  })

  useEffect(() => {
    if (
      isPlayerCardsPending ||
      isDealerCardsPending ||
      isPlayerCardsRefetching ||
      isDealerCardsRefetching
    )
      return

    setPlayerScore(checkCardsValue(playerCards!))
    setDealerScore(checkCardsValue(dealerCards!))
    setDeckId(deck!)
  }, [
    isPlayerCardsSuccess,
    isDealerCardsSuccess,
    isDealerCardsRefetching,
    isPlayerCardsRefetching
  ])

  useEffect(() => {
    checkHit()
  }, [playerScore])

  const hit = async () => {
    await getNewCardMutation.mutateAsync({
      cards: playerCards!,
      setScore: setPlayerScore
    })
  }

  const checkCardsValue = (cards: Card[]) => {
    const newCards = cards.map((card) => {
      if (
        card.value === Cards.JACK ||
        card.value === Cards.QUEEN ||
        card.value === Cards.KING
      ) {
        return {
          ...card,
          value: 10
        }
      }
      if (card.value === Cards.ACE) {
        if (playerScore + 11 > 21) {
          return {
            ...card,
            value: 1
          }
        }
        return {
          ...card,
          value: 11
        }
      }
      return {
        ...card,
        value: parseInt(card.value)
      }
    })
    const value = newCards.reduce((acc, card) => acc + card.value, 0)
    return value
  }

  useEffect(() => {
    const checkDealerTurn = async () => {
      if (dealersTurn) {
        if (
          dealerScore < 17 &&
          dealerScore < playerScore &&
          gameWinnerText === ''
        ) {
          setTimeout(async () => {
            await dealerHit()
          }, 500)
        } else {
          const winnerText = checkWinner()
          setGameWinnerText(winnerText)
          setGameFinished(true)
        }
      }
    }

    checkDealerTurn()
  }, [dealerScore, dealersTurn])

  const dealerHit = async () => {
    await getNewCardMutation.mutateAsync({
      cards: dealerCards!,
      setScore: setDealerScore
    })
  }

  const stay = () => {
    setDealerTurn(true)
  }

  const onPlayerWin = () => {
    const winBet = Number(currentBet) * 2
    const currentBalance = getChipBalance()
    const balanceUpdated = currentBalance + winBet
    updateChipBalance(balanceUpdated)
    if (currentBalance >= Number(highScore)) {
      updateHighScore(balanceUpdated)
    }
  }

  const checkHit = () => {
    if (playerScore === 21) {
      onPlayerWin()
      setGameWinnerText(strings.play.results.playerWinsBlackjack)
      setGameFinished(true)
    } else if (playerScore > 21) {
      onDealerWin()
      setGameWinnerText(strings.play.results.dealerWinsPlayerBusted)
      setGameFinished(true)
    }
  }

  const onDealerWin = () => {
    const currentBalance = getChipBalance()
    const updatedBalance = currentBalance - Number(currentBet)
    updateChipBalance(updatedBalance)
  }

  const checkWinner = () => {
    if (playerScore > 21) {
      onDealerWin()
      return strings.play.results.dealerWinsPlayerBusted
    } else if (dealerScore > 21) {
      onPlayerWin()
      return strings.play.results.playerWinsDealerBusted
    } else if (playerScore === dealerScore) {
      return strings.play.results.tie
    } else if (playerScore > dealerScore) {
      onPlayerWin()
      return strings.play.results.playerWins
    } else {
      onDealerWin()
      return strings.play.results.dealerWins
    }
  }

  const restartGame = () => {
    setGameFinished(false)
    setPlayerScore(0)
    setDealerScore(0)
    setGameWinnerText('')
    setGameRestart((prev) => !prev)
    setDealerTurn(false)
  }

  const isButtonDisabled =
    !!gameWinnerText || getNewCardMutation.isPending || dealersTurn

  return (
    <Layout className='flex flex-col'>
      {isDeckPending ||
      isPlayerCardsPending ||
      isDealerCardsPending ||
      isPlayerCardsRefetching ||
      isDealerCardsRefetching ||
      playerScore === 0 ? (
        <Loader />
      ) : (
        <>
          <div className='absolute left-0 top-4 flex w-full items-end justify-between px-4'>
            <ChipAmount
              amount={Number(currentBet)}
              border={false}
              imagePosition='left'
              tooltipSide='right'
              tooltipText={strings.play.tooltips.bet}
            />
            <ChipAmount
              amount={getChipBalance()}
              border={false}
              imagePosition='right'
              tooltipSide='left'
              tooltipText={strings.play.tooltips.balance}
            />
          </div>
          <span className='absolute right-0 top-[5.5rem] pr-4 text-white'>
            {strings.play.highScore} {highScore}
          </span>
          <div className='my-32 flex flex-1 flex-col items-center justify-between'>
            <div className='flex flex-col items-center'>
              <Score
                hideDealerScore={!dealersTurn}
                score={dealerScore}
              />
              <CardHand
                hideDealerCard={!dealersTurn}
                cards={dealerCards!}
              />
            </div>
            <div className='flex flex-col items-center'>
              <CardHand cards={playerCards!} />
              <Score score={playerScore} />
            </div>
          </div>
          <PlayerActions
            onHit={hit}
            onHitLoading={getNewCardMutation.isPending && !dealersTurn}
            onStay={stay}
            isDisabled={isButtonDisabled}
          />
        </>
      )}
      {gameWinnerText && <GameResult text={gameWinnerText} />}
      <GameFinishedDialog
        isOpen={gameFinished}
        onClickPlay={restartGame}
        onClickChangeBet={() => setGameFinished(false)}
      />
    </Layout>
  )
}

export const Route = createFileRoute(Routes.PLAY)({
  component: Play
})
