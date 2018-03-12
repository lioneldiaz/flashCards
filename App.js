import React from 'react'
import { View } from 'react-native'
import FlashCardStatusBar from './components/deck/FlashCardStatusBar'
import { lightskyblue } from './utils/Colors'
import { MainNavigator } from './components/menu/MainNavigator'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducers from './reducers/rootReducers'
import { setLocalNotification } from './utils/Helpers'

export default class App extends React.Component {
  /**
   * @description Invoke immediately after the component is inserted
   */
  componentDidMount () {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(rootReducers)}>
        <View style={{flex: 1}}>    
          <FlashCardStatusBar backgroundColor={lightskyblue} barStyle='light-content'/>        
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}