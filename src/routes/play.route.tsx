import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getDeckOfCards, getCard } from '@services/index'
import { Card } from '@models/index'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Layout } from '@components/atoms'
import {
  CardHand,
  GameResult,
  Score,
  PlayerActions
} from '@components/molecules'

const Play = () => {
  const [deckId, setDeckId] = useState<string | null>(null)
  const [playerScore, setPlayerScore] = useState<number>(0)
  const [dealerScore, setDealerScore] = useState<number>(0)
  const [gameWinnerText, setGameWinnerText] = useState<string>('')
  const [gameRestart, setGameRestart] = useState<boolean>(false)
  const [dealersTurn, setDealerTurn] = useState<boolean>(false)

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
    }
  })

  const { data: deck, isPending: isDeckPending } = useQuery({
    queryKey: ['deck'],
    queryFn: getDeckOfCards
  })

  const {
    data: playerCards,
    isPending: isPlayerCardsPending,
    isSuccess: isPlayerCardsSuccess,
    isRefetching: isPlayerCardsRefetching
  } = useQuery({
    queryKey: ['playerCards', gameRestart],
    queryFn: () => getCard(deck!, 2),
    enabled: !!deck
  })

  const {
    data: dealerCards,
    isPending: isDealerCardsPending,
    isSuccess: isDealerCardsSuccess,
    isRefetching: isDealerCardsRefetching
  } = useQuery({
    queryKey: ['dealerCards', gameRestart],
    queryFn: () => getCard(deck!, 2),
    enabled: !!deck
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

  useEffect(() => {
    checkWinner()
  }, [dealerScore])

  const hit = async () => {
    await getNewCardMutation.mutateAsync({
      cards: playerCards!,
      setScore: setPlayerScore
    })
  }

  const checkCardsValue = (cards: Card[]) => {
    const newCards = cards.map((card) => {
      if (
        card.value === 'JACK' ||
        card.value === 'QUEEN' ||
        card.value === 'KING' ||
        card.value === 'ACE'
      ) {
        return {
          ...card,
          value: 10
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
          setGameWinnerText(checkWinner())
          restartGame()
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

  const checkHit = () => {
    if (playerScore === 21) {
      setGameWinnerText('Player wins, blackjack!')
      restartGame()
    } else if (playerScore > 21) {
      setGameWinnerText('Dealer wins, player busted!')
      restartGame()
    }
  }

  const checkWinner = () => {
    if (playerScore > 21) {
      return 'Dealer wins, Player busted!'
    } else if (dealerScore > 21) {
      return 'Player wins, Dealer busted!'
    } else if (playerScore === dealerScore) {
      return "It's a tie!"
    } else if (playerScore > dealerScore) {
      return 'Player wins!'
    } else {
      return 'Dealer wins!'
    }
  }

  const restartGame = () => {
    setTimeout(() => {
      setPlayerScore(0)
      setDealerScore(0)
      setGameWinnerText('')
      setGameRestart((prev) => !prev)
      setDealerTurn(false)
    }, 4000)
  }

  const isButtonDisabled =
    !!gameWinnerText || getNewCardMutation.isPending || dealersTurn

  return (
    <Layout className='flex flex-col'>
      {isDeckPending || isPlayerCardsPending || isDealerCardsPending ? (
        <span className=''></span> // TODO: loading spinner
      ) : (
        <>
          <section className='flex flex-1 flex-col items-center'>
            <Score score={dealerScore} />
            <CardHand cards={dealerCards} />
          </section>
          {gameWinnerText && <GameResult text={gameWinnerText} />}
          <section className='flex flex-1 flex-col items-center'>
            <CardHand
              cards={playerCards}
              containerStyle='items-end'
            />
            <Score score={playerScore} />
            <PlayerActions
              onHit={hit}
              onHitLoading={getNewCardMutation.isPending && !dealersTurn}
              onStay={stay}
              isDisabled={isButtonDisabled}
            />
          </section>
        </>
      )}
    </Layout>
  )
}

export const Route = createFileRoute('/play')({
  component: Play
})
