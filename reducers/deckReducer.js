import { ADD_DECK, RECEIVE_DECKS, UPDATE_CARD_NUMBER } from '../actions/deckAction'

export function decks (state = {}, action) {
  const { type, decks, deck, card, deckId } = action
  switch (type) {
    case ADD_DECK :
      return {
        ...state, ...deck
      }
    case RECEIVE_DECKS :
      return {
        ...state, ...decks
      }
    case UPDATE_CARD_NUMBER :
      state[deckId].cardCount ++
      return {
        ...state
      }
    default : return state
  }
}