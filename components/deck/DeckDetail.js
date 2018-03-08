import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, lightBlue } from '../../utils/Colors'

export default class DeckDetail extends Component {
  
  render () {
    return (
      <View style={styles.container}>
        <View style={{margin: 10}}>
          <Text>Deck Detail</Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.textBtn}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.textBtn}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
 }
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center'
   },
   btn: {
    borderRadius: 2,
    marginTop: 20,
    borderColor: lightBlue,
    backgroundColor: white,
    alignItems: 'stretch',
   },
   textBtn: {
     padding: 25,
     textAlign: 'center',
     fontSize: 25,
     color: lightBlue
   }
 })