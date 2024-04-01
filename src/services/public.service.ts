import { baseApi } from './index'
import { GetCard, GetDeckOfCards } from '@models/index'

export const getDeckOfCards = async () => {
  try {
    const response = await baseApi.get<GetDeckOfCards>(
      '/deck/new/shuffle/?deck_count=6'
    )
    return response.data.deck_id
  } catch (error) {
    console.log(error)
  }
}

export const getCard = async (deckId: string, amountOfCards: number = 1) => {
  try {
    const response = await baseApi.get<GetCard>(
      `/deck/${deckId}/draw/?count=${amountOfCards}`
    )

    return response.data.cards
  } catch (error) {
    console.log(error)
  }
}
