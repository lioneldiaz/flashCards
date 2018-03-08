import React from 'react'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { StackNavigator, TabNavigator } from 'react-navigation'
import DeckList from '../deck/DeckList'
import CreateDeck from '../deck/CreateDeck'
import DeckDetail from '../deck/DeckDetail'
import { white, lightBlue } from '../../utils/Colors'
import { Platform } from 'react-native'

const Tabs = TabNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='home' size={20} color={tintColor} />
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'Create Deck',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='plus-circle' size={20} color={tintColor}/>
    }
  }
},{
  navigationOptions:{
    header: null
  },
  /**
   * @description This code was taken from the UdaciFitness Project
   */
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? lightBlue : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : lightBlue,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  } 
})

export const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightBlue
      }
    }
  },
})