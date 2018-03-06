import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class CreateDeck extends Component {
  render () {
    const { navigation } = this.props
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Text>Create</Text>
        </TouchableOpacity>
      </View>
    )
  }
}