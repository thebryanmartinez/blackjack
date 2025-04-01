import axios from 'axios'

export const baseApi = axios.create({
  baseURL: 'https://www.deckofcardsapi.com/api',
  headers: {}
})
