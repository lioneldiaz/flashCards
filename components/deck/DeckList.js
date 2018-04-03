import React, { Component } from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Platform, 
  FlatList } from 'react-native'
import { white, lightBlue } from '../../utils/Colors'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { getDecks } from '../../utils/Api'
import { connect } from 'react-redux'
import { receiveDecks } from '../../actions/deckAction'
import { AppLoading } from 'expo'

class DeckList extends Component {
  /**
   * @description Represent DeckList
   */
  constructor () {
    super ()
    this.state = {
      isReady: false
    }
  }
  /**
   * @description Invoke immediately after the component is inserted
   */
  componentDidMount () {
    const { dispatch } = this.props
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => {
        this.setState(() => ({ isReady: true }))
      })
  }
  /**
   * @description Render each item in the list
   */
  renderItem = ({ item }) => {    
    return (
      <TouchableOpacity key={item.id} onPress={() => this.props.navigation.navigate(
        'DeckDetail',
        {deckId: item.id, title: item.title}
      )}>
        <View style={styles.card}>
          <Text style={[styles.textCard, {marginLeft: 40}]}>{item.title}</Text>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons style={{color: white}} name="cards" size={30}/>
            <Text style={styles.textCard}>{item.cardCount} Card</Text>            
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  /**
   * @description Render if the list is empty
   */
  renderEmpty = () => {
    return (
      <View style={[styles.card, {flexDirection: 'row'}]}>
        <Ionicons style={{color: white}} name="md-information-circle" size={30}/>
        <Text style={styles.textCard}>There is no deck available</Text>         
      </View>
    )
  }
  render () {
    const {decks, navigation}=this.props
    const {isReady}=this.state
    if (!isReady) {
      return (
        <AppLoading />
      )
    }    
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderEmpty}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}
/**
 * @description Styles
 */
const styles = StyleSheet.create({
  textCard: {
    color: white, 
    fontSize: 20, 
    marginLeft: 10
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
function mapStateToProps ({decks}) {
  return {
    decks: Object.keys(decks).map(key => decks[key])
  }
}
export default connect(mapStateToProps)(DeckList)