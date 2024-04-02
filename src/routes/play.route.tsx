import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { getDeckOfCards, getCard } from '@/services'
import { useState } from 'react'
import { Card } from '@/models'

const Play = () => {
  const [deckId, setDeckId] = useState<string | null>(null)
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [dealerCards, setDealerCards] = useState<Card[]>([])
  const [playerScore, setPlayerScore] = useState<number>(0)
  const [dealerScore, setDealerScore] = useState<number>(0)

  useEffect(() => {
    const getDeck = async () => {
      const deck = await getDeckOfCards()

      if (deck) {
        const playerCards = await getCard(deck, 2)
        const dealerCards = await getCard(deck, 2)

        setDeckId(deck)
        setPlayerCards(playerCards)
        setDealerCards(dealerCards)

        setPlayerScore(checkCardsValue(playerCards))
        setDealerScore(checkCardsValue(dealerCards))
      }
    }

    getDeck()
  }, [])

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

  const stay = async () => {
    if (playerScore > dealerScore && dealerScore < 21) {
      await getNewCard(dealerCards, setDealerCards, setDealerScore)
    }
    console.log(checkWinner(playerScore, dealerScore))
  }

  const checkWinner = (playerScore: number, dealerScore: number) => {
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

  return (
    <div>
      <h1>Play</h1>
      <div>Deck: {deckId}</div>
      <p>{playerCards.map((card) => card.value).join(', ')}</p>
      <p>{dealerCards.map((card) => card.value).join(', ')}</p>
      <p>Player score: {playerScore}</p>
      <p>Dealer score: {dealerScore}</p>

      <button
        className='btn btn-primary'
        onClick={() => getNewCard(playerCards, setPlayerCards, setPlayerScore)}
      >
        Hit
      </button>
      <button
        className='btn btn-primary'
        onClick={stay}
      >
        Stay
      </button>
    </div>
  )
}

export const Route = createFileRoute('/play')({
  component: Play
})
