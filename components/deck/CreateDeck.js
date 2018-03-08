import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { lightBlue, white } from '../../utils/Colors'
import { createDeck } from '../../utils/Api'
import { connect } from 'react-redux'
import { addDeck } from '../../actions'

class CreateDeck extends Component {
  /**
   * @description Represent the CreateDeck
   */
  constructor(){
    super()
    this.state = {
      title: ''
    }
  }
  /**
   * @description Change the value of Deck Title
   */
  handleChange = (title) => {
    this.setState(() => ({
      title
    }))
  }
  submit = () => {
    const key = this.state.title
    const deck = this.state

    this.props.dispatch(addDeck({
      [key]: deck
    }))
    
    this.setState(() => ({
      title: ''
    }))
    createDeck({key, deck})
  }
  render () {
    const { navigation } = this.props
    return (
      <KeyboardAvoidingView 
        keyboardVerticalOffset = {2}
        style={styles.container}>
        <View style={{margin: 10}}>
          <TextInput
            style={{fontSize:20}}
            placeholder='Deck Title'
            maxLength={40}
            onChangeText={this.handleChange}
            value={this.state.title}
          />
          <TouchableOpacity style={styles.submitBtn} onPress={this.submit}>
            <Text style={styles.textBtn}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
/**
 * @description Style
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  submitBtn: {
    marginTop: 20,
    borderRadius: 2,
    backgroundColor: lightBlue,
    alignItems: 'stretch',
  },
  textBtn: {
    textAlign: 'center',
    fontSize: 20,
    color: white,
    padding: 10,
  }
})

export default connect()(CreateDeck)