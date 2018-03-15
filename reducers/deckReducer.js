import { ADD_DECK, RECEIVE_DECKS, UPDATE_CARD_NUMBER, REMOVE_DECK } from '../actions/deckAction'

export function decks (state = {}, action) {
  const { type, decks, deck, card, deckId, key } = action
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
      let deck = state[deckId]
      deck.cardCount ++
      return {
        ...state, [deckId]:deck
      }
    case REMOVE_DECK :
      let updateDecks = state
      delete updateDecks[key]
      return {
        ...state, ...updateDecks
      }
    default : return state
  }
}