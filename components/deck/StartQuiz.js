import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
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
      showScore: false,
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
    const {indexCard, arrayCards, ready, showAnswer, showScore}=this.state
    if (!ready) {
      return (
        <AppLoading />
      )
    }
    return (
      <View style={{flex: 1}}>
        <Text style={styles.questionRemaining}>{`${indexCard + 1}/${arrayCards.length}`}</Text>
        <View style={styles.container}>          
          {showScore && (
            <View style={styles.viewScore}>
              <Text style={styles.textScore}>{percentage(this.state.correctAnswer, this.state.incorrectAnswer)} %</Text>
            </View>
          )}
          {!showScore
            ? <View>
                <View style={styles.questionAnswer}>
                  <Text style={styles.question}>{arrayCards[indexCard].question}</Text>
                  {showAnswer
                    ? <View>
                        <Text style={styles.textAnswer} onPress={this.hidenAnswer}>Hide Answer</Text>
                        <Text style={styles.answer}>{arrayCards[indexCard].answer}</Text>
                      </View>
                    : <Text style={styles.textAnswer} onPress={this.showAnswer}>Answer</Text>
                  }
                </View>
                <TextButton
                  style={[styles.btn, styles.textBtn, {backgroundColor: green}]}
                  onPress={() => this.evaluateAnswer('Yes')}
                >
                  Correct
                </TextButton>
                <TextButton 
                  style={{backgroundColor: red}}
                  onPress={() => this.evaluateAnswer('No')}
                >
                  Incorrect
                </TextButton>
              </View>
            : <TextButton 
                style={{backgroundColor: lightBlue}}
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
    margin: 10,    
    justifyContent: 'center'
  },
  questionAnswer: {
    marginBottom: 25,
    alignItems: 'center'
  },
  questionRemaining: {
    fontSize: 25,
    padding: 10
  },
  textAnswer: {
    fontSize: 25, 
    color: red
  },
  answer: {
    fontSize: 20,
    textAlign: 'center'
  },
  question: {
    fontSize: 30,
    marginBottom: 20
  },
  viewScore: {
    marginTop: 20, 
    alignItems: 'center'
  },
  textScore: {
    fontSize: 30, 
    padding: 10
  }
})