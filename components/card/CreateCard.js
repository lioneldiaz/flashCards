import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Picker } from 'react-native'
import { generateKey } from '../../utils/Helpers'
import { addCardToDeck, updateDeck } from '../../utils/Api'
import { connect } from 'react-redux'
import { updateCardNumber } from '../../actions/deckAction'
import TextButton from '../button/TextButton'
import TextInputField from '../input/TextInputField'
import { white } from '../../utils/Colors'
import Message from '../messages/Message'
import debounce from 'lodash.debounce'
import { HeaderBackButton } from 'react-navigation'

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
      answer: 'Yes',
      deckId: props.navigation.state.params.deckId,
      error: false,
      message: false
    }
    this.closeMessage = debounce(this.closeMessage, 2000)
  }
  static navigationOptions = ({ navigation }) => {
    const { deckId, title } = navigation.state.params
    return {
      headerLeft: <HeaderBackButton tintColor={white} onPress={()=> navigation.navigate('DeckDetail', {deckId: deckId, title: title})}/>
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
    delete card.error
    delete card.message
    const deckId = this.state.deckId
    const { question, answer } = this.state

    if (question.trim() !== '' && answer.trim() !== '') {
      this.props.dispatch(updateCardNumber(deckId))
      this.setState(() => ({
        id: generateKey(),
        question: '',
        answer: 'Yes',
        error: false
      }))

      addCardToDeck({key, card})
      updateDeck(deckId)
        .then(() => {
          this.showMessage()
          this.closeMessage()
        })
    }
    else {
      this.setState(() => ({ error: true }))
    }
  }
  /**
   * @description Show or hide a message
   */
  showMessage = () => this.setState(() => ({ message: true}))
  closeMessage = () => this.setState(() => ({ message: false}))
  render () {
    const {error, message}=this.state
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
      >
        {message && (<Message style={{margin: 10}}>The card has been added</Message>)}
        <View style={{margin: 10}}>
          <TextInputField
            error={error}
            placeholder="Question"
            value={this.state.question}
            onChangeText={this.handleQuestion}
          />
          <Picker
            selectedValue={this.state.answer}
            onValueChange={this.handleAnswer}>
            <Picker.Item label="Correct" value="Yes" />
            <Picker.Item label="Incorrect" value="No" />
          </Picker>
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
    justifyContent: 'center',
  },
})
export default connect()(CreateCard)