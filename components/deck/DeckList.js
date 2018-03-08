import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Platform } from 'react-native'
import { white, lightBlue } from '../../utils/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getAllDeck, removeDeck } from '../../utils/Api'
import { connect } from 'react-redux'
import { receiveDecks } from '../../actions'
import { AppLoading } from 'expo'

class DeckList extends Component {
  /**
   * @description Represent DeckList
   */
  constructor () {
    super ()
    this.state = {
      ready: false
    }
  }
  /**
   * @description Invoke immediately after the component is inserted
   */
  componentDidMount () {
    const { dispatch } = this.props
    getAllDeck()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
  }
  renderItem = () => {

  }
  get =() => {
    //removeDeck()
    let a = getAllDeck()
  }
  render () {
    const { navigation } = this.props
    const { decks } = this.props
    const { ready } = this.state    
    if (!ready) {
      return (
        <AppLoading />
      )
    }    
    return (
      <View style={styles.container}>
        {Object.keys(decks).map((key, index)=> {
          return (
            <TouchableOpacity  key={index} onPress={() => navigation.navigate('DeckDetail')}>
              <View style={styles.card}>
                <Text style={{color: white}}>{decks[key].title}</Text>
                <Text style={{color: white}}>0 Card </Text>
              </View>
            </TouchableOpacity>
          )
        })}
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
/**
 * @description Specify which data from the store you passed to your Component
 * @param {Object} decks
 * @return {Object}
 */
function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(DeckList)