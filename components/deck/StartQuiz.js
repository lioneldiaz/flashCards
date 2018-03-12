import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TextButton from '../button/TextButton'
import { white, green, red, lightBlue } from '../../utils/Colors'
import { getCards } from '../../utils/Api'
import { AppLoading } from 'expo'
import { generateKey, percentage } from '../../utils/Helpers'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { setLocalNotification, clearNotification } from '../../utils/Helpers'

export default class StartQuiz extends Component {
  /**
   * @description Represent StartQuiz
   */
  constructor () {
    super()
    this.state = {
      indexCard: 0,
      arrayCards: [],
      ready: false,
      showAnswer: false,
      correctAnswer: 0,
      incorrectAnswer: 0,
      showScore: false
    }
  }
  /**
   * @description Invoke immediately after the component is inserted
   */
  componentDidMount () {
    const id  = this.props.navigation.state.params.deckId
    const { dispatch } = this.props
    getCards()
      .then(cards => {
        Object.keys(cards).map(key => {
          let data = {}
          if (cards[key].deckId === id) {
            this.setState((prevState) => ({
              arrayCards: prevState.arrayCards.concat(cards[key])
            }))
          }
        })
      })
      .then(() => this.setState(() => ({ ready: true})))
  }
  /**
   * @description Show or hide the answer
   */
  showAnswer = () => this.setState(() => ({ showAnswer: true}))
  hidenAnswer = () => this.setState(() => ({ showAnswer: false}))
  /**
   * @description Evaluate the answer
   * @param {string} answer
   */
  evaluateAnswer = (answer) => {
    const { arrayCards, indexCard } = this.state
    if (arrayCards[indexCard].answer === answer) {
      this.setState((prevState) => ({
        correctAnswer: prevState.correctAnswer + 1        
      }))
    }
    else {
      this.setState((prevState) => ({
        incorrectAnswer: prevState.incorrectAnswer + 1
      }))
    }
    if (arrayCards.length === indexCard + 1) {
      clearNotification()
        .then(setLocalNotification)
        .then(() => this.setState(() => ({ showScore: true})))
    }
    else {
      this.setState((prevState) => ({
        indexCard: prevState.indexCard + 1
      }))
    }
  }
  /**
   * @description Reset the quiz
   */
  reset = () => {
    this.setState(() => ({
      indexCard: 0,
      showAnswer: false,
      correctAnswer: 0,
      incorrectAnswer: 0,
      showScore: false
    }))
  }
  render () {
    const {cards}=this.props
    const {indexCard, arrayCards, ready, showAnswer, showScore} = this.state
    if (!ready) {
      return (
        <AppLoading />
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.questionRemaining}>{`${indexCard + 1}/${arrayCards.length}`}</Text>
        <View style={{margin: 10, flex: 1, justifyContent: 'center'}}>          
          {showScore && (
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <Text style={{fontSize: 25, padding: 10}}>{percentage(this.state.correctAnswer, this.state.incorrectAnswer)} %</Text>
            </View>
          )}
          {!showScore
            ? <View>
                <View style={styles.questionAnswer}>
                  <Text style={{fontSize: 30}}>{arrayCards[indexCard].question}</Text>
                  {showAnswer
                    ? <View>
                        <Text key={generateKey()} style={{fontSize: 25, color: red}} onPress={this.hidenAnswer}>Hide Answer</Text>
                        <Text key={generateKey()}>{arrayCards[indexCard].answer}</Text>
                      </View>
                    : <Text style={{fontSize: 25, color: red}} onPress={this.showAnswer}>Answer</Text>
                  }
                </View>
                <TextButton
                  style={[styles.btn, styles.textBtn, {backgroundColor: green}]}
                  onPress={() => this.evaluateAnswer('Yes')}
                >
                  Correct
                </TextButton>
                <TextButton 
                  style={[styles.btn, styles.textBtn, {backgroundColor: red}]}
                  onPress={() => this.evaluateAnswer('No')}
                >
                  Incorrect
                </TextButton>
              </View>
            : <TextButton 
                style={[styles.btn, styles.textBtn, {backgroundColor: lightBlue}]}
                onPress={this.reset}
              >
                <MaterialCommunityIcons name="restart" size={30}/>
                Restart Quiz
              </TextButton>
          }
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
  },
  btn: {
    borderRadius: 2,
    marginTop: 20,
    alignItems: 'stretch',
   },
   textBtn: {
     padding: 25,
     textAlign: 'center',
     color: white,
     fontSize: 25,
   },
   questionAnswer: {
     marginBottom: 25,
     alignItems: 'center'
   },
   questionRemaining: {
     fontSize: 25,
     padding: 10
   },
})