import { ADD_DECK, RECEIVE_DECKS } from '../actions'

function decks (state = {}, action) {
  const { type, decks, deck } = action
  switch (type) {
    case ADD_DECK :
      return {
        ...state, ...deck
      }
    case RECEIVE_DECKS :
      return {
        ...state, ...decks
      }
    default : return state
  }
}

export default decks