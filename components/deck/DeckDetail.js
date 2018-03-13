import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { white, lightBlue, gray } from '../../utils/Colors'
import TextButton from '../button/TextButton'

class DeckDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const { title } = navigation.state.params
    return {
      title: title
    }
  }
  render () {    
    const { deck, navigation } = this.props
    const { deckId } = navigation.state.params
    return (
      <View style={styles.container}>
        <View style={{margin: 10}}>
          <Text style={[styles.textContent, {fontSize: 35}]}>{deck.title}</Text>
          <Text style={[styles.textContent, styles.textCard]}>{deck.cardCount} cards</Text>
          <TextButton
            onPress={()=>navigation.navigate(
            'CreateCard',
            {deckId: deckId}
            )}>
            <MaterialCommunityIcons name="cards" size={30}/>
            Add Card
          </TextButton>
          <TextButton
            disabled={deck.cardCount === 0 ? true : false}            
            onPress={()=>navigation.navigate(
              'StartQuiz',
              {deckId: deckId})}>
            Start Quiz
          </TextButton>
        </View>
      </View>
    )
  }
 }
 /** 
  * @description Styles
 */
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center'
   },
   textContent: {
     textAlign: 'center',
     marginBottom: 15,
   },
   textCard: {
    fontSize: 25, 
    color: gray
   },
 })
/**
 * @description Specify which data from the store you passed to your component
 * @param {Object} state 
 * @param {Object} navigation
 */
 function mapStateToProps (state, {navigation}) {
  const { deckId } = navigation.state.params
  return {
    deck: state.decks[deckId]
  }
 }
 export default connect(mapStateToProps)(DeckDetail)