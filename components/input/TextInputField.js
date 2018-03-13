import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { red } from '../../utils/Colors'

const TextInputField = ({error, onChangeText, value, placeholder, maxLength, style={}}) => {
  return (
    <TextInput 
      style={[!error ? styles.input : styles.inputError, style]}
      placeholder={placeholder}
      maxLength={maxLength}
      onChangeText={onChangeText}
      value={value}
    />
  )
}
const styles = StyleSheet.create({
  input: {
    fontSize:20,
    padding: 10
  },
  inputError: {
    borderWidth: 1,
    borderColor: red,
    fontSize:20, 
    padding: 10,
    marginTop: 15,
    borderRadius: 2
  }
})
export default TextInputField