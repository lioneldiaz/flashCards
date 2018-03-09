import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

export default class CreateCard extends Component {
  /** 
   * @description Represent the CreateCard
  */
  constructor () {
    super ()
    this.state = {
      question: '',
      answer: ''
    }
  }
  render () {
    console.log("PRops", this.props)
    return (
      <View style={{flex: 1}}>
        <TextInput 
          placeholder='Question'
          value={this.state.question}
        />
        <TextInput 
          placeholder='Answer'
          value={this.state.answer}
        />
        <TouchableOpacity>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }
} 