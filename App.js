import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import FlashCardStatusBar from './components/FlashCardStatusBar'
import { lightBlue, white, lightskyblue } from './utils/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Drawer } from './components/menu/Drawer'

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>        
        <FlashCardStatusBar backgroundColor={lightskyblue} barStyle='light-content'/>
        <View style={styles.menu}>
          <TouchableOpacity>
            <MaterialCommunityIcons name='menu' size={30} style={{color: white, marginLeft: 5}} />
          </TouchableOpacity>
        </View>
        <Drawer/>
      </View>
    )
  }
}

/**
 * @description Styles for the bar menu
 */
const styles = StyleSheet.create({
  menu: {
    height: 50,
    backgroundColor: lightBlue,
    justifyContent: 'center'
  }
})
