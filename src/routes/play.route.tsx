import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { getDeckOfCards, getCard } from '@/services'
import { useState } from 'react'
import { Card } from '@/models'
import { cardDictionary } from '@/utils/cardsDictionaryImages'

const Play = () => {
  const [deckId, setDeckId] = useState<string | null>(null)
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [dealerCards, setDealerCards] = useState<Card[]>([])
  const [playerScore, setPlayerScore] = useState<number>(0)
  const [dealerScore, setDealerScore] = useState<number>(0)
  const [gameWinnerText, setGameWinnerText] = useState<string>('')
  const [gameRestart, setGameRestart] = useState<boolean>(false)
  const [hitLoading, setHitLoading] = useState<boolean>(false)
  const [stayLoading, setStayLoading] = useState<boolean>(false)
  const [dealersTurn, setDealerTurn] = useState<boolean>(false)

  useEffect(() => {
    const getDeck = async () => {
      const deck = await getDeckOfCards()

      if (deck) {
        Promise.all([getCard(deck, 2), getCard(deck, 2)]).then(
          ([playerCards, dealerCards]) => {
            setPlayerCards(playerCards)
            setDealerCards(dealerCards)
            setPlayerScore(checkCardsValue(playerCards))
            setDealerScore(checkCardsValue(dealerCards))
          }
        )

        setDeckId(deck)
      }
    }

    getDeck()
  }, [gameRestart])

  useEffect(() => {
    checkHit()
  }, [playerScore])

  useEffect(() => {
    checkWinner()
  }, [dealerScore])

  const hit = async () => {
    try {
      setHitLoading(true)
      await getNewCard(playerCards, setPlayerCards, setPlayerScore)
    } catch (error) {
      console.log(error)
    } finally {
      setHitLoading(false)
    }
  }

  const getNewCard = async (
    cards: Card[],
    setCards: (cards: Card[]) => void,
    setScore: (score: number) => void
  ) => {
    const newCards = [...cards]

    const newCard = await getCard(deckId!, 1)
    newCards.push(newCard[0])
    setCards(newCards)
    setScore(checkCardsValue(newCards))
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
        setStayLoading(true)
        if (
          dealerScore < 17 &&
          dealerScore < playerScore &&
          gameWinnerText === ''
        ) {
          setTimeout(async () => {
            await dealerHit()
          }, 500)
        } else {
          setStayLoading(false)
          setGameWinnerText(checkWinner())
          restartGame()
        }
      }
    }

    checkDealerTurn()
  }, [dealerScore, dealersTurn])

  const dealerHit = async () => {
    try {
      setStayLoading(true)
      await getNewCard(dealerCards, setDealerCards, setDealerScore)
    } catch (error) {
      console.log(error)
    }
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
      setPlayerCards([])
      setDealerCards([])
      setPlayerScore(0)
      setDealerScore(0)
      setGameWinnerText('')
      setGameRestart((prev) => !prev)
      setDealerTurn(false)
    }, 4000)
  }

  const RenderScore = (props: { score: number }) => {
    return (
      <div className='my-4 grid h-12 w-12 place-items-center rounded-full bg-white font-bold text-black'>
        {props.score}
      </div>
    )
  }

  const RenderCardsAndScore = (props: {
    cards: Card[]
    containerStyle?: string
  }) => {
    return (
      <div
        className={`relative flex h-full w-screen justify-center ${props.containerStyle}`}
      >
        <RenderCards cards={props.cards} />
      </div>
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

  return (
    <div className='flex h-screen flex-col'>
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
          <button
            className='btn btn-primary btn-wide'
            onClick={hit}
            disabled={!!gameWinnerText}
          >
            {hitLoading ? (
              <span className='loading loading-spinner'></span>
            ) : (
              'Hit'
            )}
          </button>
          <button
            className='btn btn-secondary btn-wide'
            onClick={stay}
            disabled={!!gameWinnerText}
          >
            {stayLoading ? (
              <span className='loading loading-spinner'></span>
            ) : (
              'Stay'
            )}
          </button>
        </div>
      </section>
    </div>
  )
}

export const Route = createFileRoute('/play')({
  component: Play
})
