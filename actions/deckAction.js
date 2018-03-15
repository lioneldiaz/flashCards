export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const UPDATE_CARD_NUMBER = 'UPDATE_CARD_NUMBER'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function updateCardNumber (deckId) {
  return {
    type: UPDATE_CARD_NUMBER,
    deckId
  }
}

export function removeDeck (key) {
  return {
    type: REMOVE_DECK,
    key
  }
}