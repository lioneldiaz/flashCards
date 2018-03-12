import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const TextButton = ({children, onPress, disabled, style = {}}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  )
}
export default TextButton