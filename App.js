import React from 'react'
import { View } from 'react-native'
import FlashCardStatusBar from './components/deck/FlashCardStatusBar'
import { lightskyblue } from './utils/Colors'
import { MainNavigator } from './components/menu/MainNavigator'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>    
          <FlashCardStatusBar backgroundColor={lightskyblue} barStyle='light-content'/>        
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}