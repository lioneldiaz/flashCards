import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { white, lightBlue, gray } from '../../utils/Colors'
import TextButton from '../button/TextButton'
import Message from '../messages/Message'
import { getDecks } from '../../utils/Api'
import { receiveDecks } from '../../actions/deckAction'
import debounce from 'lodash.debounce'
import { AppLoading } from 'expo'
import { HeaderBackButton } from 'react-navigation'

class DeckDetail extends Component {
  /**
   * @description Represent DeckDetail
   */
  constructor () {
    super ()
    this.state = {
      message: false,
      ready: false
    }
    this.closeMessage = debounce(this.closeMessage, 2000)
  }
  /**
   * @description Invoke immediately after the component is inserted
   */
  componentDidMount () {
    const { dispatch } = this.props
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => {
        this.setState(() => ({ ready: true }))
      })
  }
  static navigationOptions = ({navigation}) => {
    const { title } = navigation.state.params
    return {
      title: title,
      headerLeft: <HeaderBackButton tintColor={white} onPress={() => navigation.navigate('Home')} />
    }
  }
  /**
   * @description Route to Start Quiz or show some information
   */
  routeStartQuiz = () => {
    const { deck, navigation } = this.props
    if (deck.cardCount !== 0)
      navigation.navigate('StartQuiz',{deckId: navigation.state.params.deckId})
    else {
      this.showMessage()
      this.closeMessage()
    }
  }
  /**
   * @description Show or hide a message
   */
  showMessage = () => this.setState(() => ({ message: true}))
  closeMessage = () => this.setState(() => ({ message: false}))
  /**
   * @description Route to create new card
   */
  routeCreateCard = () => {
    const { deckId, title } = this.props.navigation.state.params
    this.props.navigation.navigate(
      'CreateCard',
      {deckId: deckId, title: title})
  }
  render () {
    const { deck, navigation } = this.props
    const { deckId } = navigation.state.params
    if (!this.state.ready) {
      return (
        <AppLoading />
      )
    }
    return (
      <View style={styles.container}>
        <View style={{margin: 10}}>
          {this.state.message && <Message>There are no cards for start quiz</Message>}
          <Text style={[styles.textContent, {fontSize: 35}]}>{deck.title}</Text>
          <Text style={[styles.textContent, styles.textCard]}>{deck.cardCount} cards</Text>
          <TextButton
            onPress={this.routeCreateCard}>
            <MaterialCommunityIcons name="cards" size={30}/>
            Add Card
          </TextButton>
          <TextButton       
            onPress={this.routeStartQuiz}>
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