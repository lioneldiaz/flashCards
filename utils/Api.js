import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY } from './Constants'
import { formattedData } from './Helpers';

export function getAllDeck () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(formattedData)
}

export function createDeck ({ deck, key}) { 
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function removeDeck () {
  return AsyncStorage.removeItem(DECK_STORAGE_KEY)
}