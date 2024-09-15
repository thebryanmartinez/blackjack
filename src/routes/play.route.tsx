import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { getDeckOfCards, getCard } from '@/services'
import { useState } from 'react'
import { Card } from '@/models'
import { cardDictionary } from '@/utils/cardsDictionaryImages'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Container, Layout } from '@/components/atoms'

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

  const stay = async () => {
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

  const RenderScore = (props: { score: number }) => {
    return (
      <Container className='!my-4 grid place-items-center bg-white !px-4 !py-2'>
        {props.score}
      </Container>
    )
  }

  const RenderCardsAndScore = (props: {
    cards: Card[]
    containerStyle?: string
  }) => {
    return (
      <section
        className={`relative flex h-full w-screen justify-center ${props.containerStyle}`}
      >
        <RenderCards cards={props.cards} />
      </section>
    )
  }

  const RenderCards = (props: { cards: Card[] }) => {
    return (
      <>
        {props.cards.map((card, index) => {
          const cardMargin =
            '[&:nth-child(2)]:ml-[4rem] [&:nth-child(3)]:ml-[8rem] [&:nth-child(4)]:ml-[12rem] [&:nth-child(5)]:ml-[16rem] [&:nth-child(6)]:ml-[20rem] [&:nth-child(7)]:ml-[24rem] [&:nth-child(8)]:ml-[28rem] [&:nth-child(9)]:ml-[32rem] [&:nth-child(10)]:ml-[36rem] [&:nth-child(11)]:ml-[40rem] [&:nth-child(12)]:ml-[44rem]'
          return (
            <div
              className={`absolute flex w-36 flex-col bg-black ${cardMargin}`}
              key={index}
            >
              <img
                className=''
                src={cardDictionary[card.code]}
                alt=''
              />
            </div>
          )
        })}
      </>
    )
  }

  const RenderGameWinner = () => {
    return (
      <div className='text-center'>
        <p className='text-4xl font-bold'>{gameWinnerText}</p>
      </div>
    )
  }

  const isButtonDisabled =
    !!gameWinnerText || getNewCardMutation.isPending || dealersTurn

  return (
    <Layout className='flex flex-col'>
      {isDeckPending || isPlayerCardsPending || isDealerCardsPending ? (
        <span className=''></span>
      ) : (
        <>
          <section className='flex flex-1 flex-col items-center justify-center'>
            <RenderScore score={dealerScore} />
            <RenderCardsAndScore cards={dealerCards} />
          </section>
          <section>{gameWinnerText && <RenderGameWinner />}</section>
          <section className='flex flex-1 flex-col items-center'>
            <RenderCardsAndScore
              cards={playerCards}
              containerStyle='items-end'
            />
            <RenderScore score={playerScore} />
            <section className='flex flex-1 flex-col items-center justify-center'></section>
            <div className='flex w-full flex-row justify-center gap-12 pb-8'>
              <Button
                onClick={hit}
                loading={getNewCardMutation.isPending && !dealersTurn}
                text='Hit'
                className='is-primary'
                disabled={isButtonDisabled}
              />
              <Button
                text='Stay'
                onClick={stay}
                disabled={isButtonDisabled}
              />
            </div>
          </section>
        </>
      )}
    </Layout>
  )
}

export const Route = createFileRoute('/play')({
  component: Play
})
