import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, CARD_STORAGE_KEY } from './Constants'
import { formattedData } from './Helpers'

/** 
 * @description Get all decks
*/
export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(formattedData)
}
/**
 * @description Add new Deck
 * @param {string} key
 * @param {Object} deck 
 */
export function saveDeck ({ deck, key}) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}
/** 
 * @description Get all cards
*/
export function getCards () {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then(formattedData)
}
/**
 * @description Add new card
 * @param {string} key
 * @param {Object} card
 */
export function addCardToDeck ({card, key}) {
  return AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
    [key]: card
  }))
}
/**
 * @description Update the card number for a specific Deck
 * @param {string} deckId 
 */
export function updateDeck (deckId) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(decks => {
      const data = JSON.parse(decks)
      data[deckId].cardCount ++
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}
/**
 * @description Remove specific deck
 * @param {string} key 
 */
export function deleteDeck (key) {
  return getDecks()
    .then(decks => {
      decks[key] = undefined
      delete decks[key]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
    })
}
/** 
 * @description Remove all Decks
*/
export function removeDecks () {
  return AsyncStorage.removeItem(DECK_STORAGE_KEY)
}
/** 
 * @description Remove all Cards
*/
export function removeCard () {
  return AsyncStorage.removeItem(CARD_STORAGE_KEY)
}