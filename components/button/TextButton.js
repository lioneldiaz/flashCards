import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, lightBlue } from '../../utils/Colors'
import { MaterialIcons } from '@expo/vector-icons'

const TextButton = ({children, onPress, disabled, style = {}, nameIcon}) => {
  return (
    <TouchableOpacity style={[styles.btn, style]} disabled={disabled} onPress={onPress}>
      <MaterialIcons style={{color: white}} name={nameIcon} size={30}/>
      <Text style={[styles.textBtn, style]}>{children}</Text>
    </TouchableOpacity>
  )
}
/**
 * @description Styles
*/
const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    borderRadius: 2,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: lightBlue
  },
  textBtn: {
    textAlign: 'center',
    fontSize: 25,
    color: white,
    padding: 10,
  }
})
export default TextButton