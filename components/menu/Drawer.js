import React from 'react'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { DrawerNavigator } from 'react-navigation'
import DeckList from '../DeckList'
import CreateDeck from '../CreateDeck'

export const Drawer = DrawerNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: () => <FontAwesome name='home' size={20} />
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      drawerLabel: 'Create Deck',
      drawerIcon: () => <MaterialCommunityIcons name='plus-circle' size={20} />
    }
  }
})