import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { saveDeck } from '../../utils/Api'
import { connect } from 'react-redux'
import { addDeck } from '../../actions/deckAction'
import { generateKey } from '../../utils/Helpers'
import TextButton from '../button/TextButton'
import TextInputField from '../input/TextInputField'

class CreateDeck extends Component {
  /**
   * @description Represent CreateDeck
   */
  constructor(){
    super()
    this.state = {
      id: generateKey(),
      title: '',
      cardCount: 0,
      error: false
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

    if (deck.title.trim() !== '') {
      this.props.dispatch(addDeck({
        [key]: deck
      }))
      
      this.setState(() => ({
        id: generateKey(),
        title: '',
        error: false
      }))
      saveDeck({key, deck})
    }
    else {
      this.setState(() => ({ error: true }))
    }
  }
  render () {
    const { navigation } = this.props
    const { error } = this.state
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
      >
        <View style={{margin: 10}}>
          <TextInputField
            error={error}
            placeholder="Deck Title"
            maxLength={40}
            onChangeText={this.handleChange}
            value={this.state.title}
          />
          <TextButton nameIcon={'note-add'} onPress={this.submit}>
            Save Deck
          </TextButton>
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
})
export default connect()(CreateDeck)