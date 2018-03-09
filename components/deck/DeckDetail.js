import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, lightBlue } from '../../utils/Colors'

class DeckDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const { deckId } = navigation.state.params
    return {
      title: deckId
    }
  }
  render () {
    const { deck, navigation } = this.props
    const { deckId } = navigation.state.params
    return (
      <View style={styles.container}>
        <View style={{margin: 10}}>
          <Text>{deck.title}</Text>
          <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate(
            'CreateCard',
            {deckId: deckId}
          )}>
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
 /** 
  * @description Style
 */
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
/**
 * @description Specify which data from the store you passed to your component
 * @param {Object} state 
 * @param {Object} navigation 
 */
 function mapStateToProps (state, {navigation}) {
   const { deckId } = navigation.state.params

   return {
     deck: state[deckId]
   }
 }
 export default connect(mapStateToProps)(DeckDetail)