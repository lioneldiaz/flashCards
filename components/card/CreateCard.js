import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { generateKey } from '../../utils/Helpers'
import { addCardToDeck, updateDeck } from '../../utils/Api'
import { connect } from 'react-redux'
import { updateCardNumber } from '../../actions/deckAction'
import TextButton from '../button/TextButton'
import TextInputField from '../input/TextInputField'
import { white } from '../../utils/Colors'

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
      deckId: props.navigation.state.params.deckId,
      error: false
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
    const { question, answer } = this.state
    if (question.trim() !== '' && answer.trim() !== '') {
      this.props.dispatch(updateCardNumber(deckId))

      this.setState(() => ({
        id: generateKey(),
        question: '',
        answer: '',
        error: false
      }))

      addCardToDeck({key, card})
      updateDeck(deckId)
    }
    else {
      this.setState(() => ({ error: true }))
    }
  }
  render () {
    const {error}=this.state
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
      >
        <View style={{margin: 10}}>
          <TextInputField
            error={error}
            placeholder="Question"
            value={this.state.question}
            onChangeText={this.handleQuestion}
          />
          <TextInputField
            error={error}
            placeholder="Answer"
            value={this.state.answer}
            onChangeText={this.handleAnswer}
          />
          <TextButton nameIcon={'note-add'} onPress={this.submit}>            
            Save Card
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
    justifyContent: 'center'
  },
})
export default connect()(CreateCard)