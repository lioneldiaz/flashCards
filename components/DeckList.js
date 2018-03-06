import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Platform } from 'react-native'
import { white, lightBlue } from '../utils/Colors'

class DeckList extends Component { 
  renderItem = () => {

  }
  render () {
    const { navigation } = this.props
    return (
      <View style={styles.container}>        
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
          <View style={styles.card}>
            <Text style={{color: white}}>Deck 1</Text>
            <Text style={{color: white}}>3 Card </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

/**
 * @description Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  /**
   * @description This code was taken from the UdaciFitness Project
   */
  card: {
    backgroundColor: lightBlue,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
})
export default DeckList