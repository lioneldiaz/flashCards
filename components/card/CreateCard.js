import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import TextButton from '../button/TextButton'
import { generateKey } from '../../utils/Helpers'
import { addCardToDeck, updateDeck } from '../../utils/Api'
import { connect } from 'react-redux'
import { updateCardNumber } from '../../actions/deckAction'
import SaveButton from '../button/SaveButton'

class CreateCard extends Component {
  /** 
   * @description Represent the CreateCard
   * @param {props} props
  */
  constructor (props) {
    super (props)
    this.state = {
      id: generateKey(),
      question: '',
      answer: '',
      deckId: props.navigation.state.params.deckId
    }
  }
  /**
   * @description Change the value of the answer field
   */
  handleAnswer = (answer) => {
    this.setState(() => ({ answer }))
  }
  /**
   * @description Change the value of the question field
   */
  handleQuestion = (question) => {
    this.setState(() => ({ question }))
  }
  /**
   * @description Save a new Card
   */
  submit = () => {
    const key = this.state.id
    const card = this.state
    const deckId = this.state.deckId
    this.props.dispatch(updateCardNumber(deckId))

    this.setState(() => ({
      id: generateKey(),
      question: '',
      answer: ''
    }))

    addCardToDeck({key, card})
    updateDeck(deckId)
  }
  render () {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
      >
        <View style={{margin: 10}}>
          <TextInput
            style={styles.input}
            placeholder="Question"
            value={this.state.question}
            onChangeText={this.handleQuestion}
          />
          <TextInput
            style={styles.input}
            placeholder="Answer"
            value={this.state.answer}
            onChangeText={this.handleAnswer}
          />
          <SaveButton onPress={this.submit}>
            Save Card
          </SaveButton>
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
    justifyContent: 'center'
  },
  input: {
    fontSize:20, 
    paddingBottom: 10,
    marginTop: 15
  }
})

export default connect()(CreateCard)