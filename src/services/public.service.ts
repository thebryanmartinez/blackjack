import { baseApi } from './index'
import { GetCard, GetDeckOfCards, Card } from '@models/index'

export const getDeckOfCards = async (): Promise<string | null> => {
  try {
    const response = await baseApi.get<GetDeckOfCards>(
      '/deck/new/shuffle/?deck_count=6'
    )
    return response.data.deck_id
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getCard = async (deckId: string, amountOfCards: number = 1) : Promise<Card[]> => {
  try {
    const response = await baseApi.get<GetCard>(
      `/deck/${deckId}/draw/?count=${amountOfCards}`
    )

    return response.data.cards
  } catch (error) {
    console.log(error)
    return []
  }
}
