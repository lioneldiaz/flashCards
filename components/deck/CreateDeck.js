import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { lightBlue, white } from '../../utils/Colors'
import { saveDeck } from '../../utils/Api'
import { connect } from 'react-redux'
import { addDeck } from '../../actions/deckAction'
import { generateKey } from '../../utils/Helpers'
import SaveButton from '../button/SaveButton'

class CreateDeck extends Component {
  /**
   * @description Represent CreateDeck
   */
  constructor(){
    super()
    this.state = {
      id: generateKey(),
      title: '',
      cardCount: 0
    }
  }
  /**
   * @description Change the value of the title field
   */
  handleChange = (title) => {
    this.setState(() => ({
      title
    }))
  }
  /**
   * @description Save a new Deck
   */
  submit = () => {
    const key = this.state.id
    const deck = this.state

    this.props.dispatch(addDeck({
      [key]: deck
    }))
    
    this.setState(() => ({
      id: generateKey(),
      title: ''
    }))
    saveDeck({key, deck})
  }
  render () {
    const { navigation } = this.props
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
      >
        <View style={{margin: 10}}>
          <TextInput
            style={styles.input}
            placeholder="Deck Title"
            maxLength={40}
            onChangeText={this.handleChange}
            value={this.state.title}
          />
          <SaveButton onPress={this.submit}>Save Deck</SaveButton>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
/**
 * @description Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    fontSize:20, 
    paddingBottom: 10
  }  
})
export default connect()(CreateDeck)