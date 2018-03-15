import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { red, lightBlue, white } from '../../utils/Colors'

const Message = ({children, style = {}}) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons style={styles.icon} name="md-information-circle" size={30}/>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}
/**
 * @description Styles
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  text: {
    fontSize: 15,
    color: white,
    padding: 20
  },
  icon: {
    paddingTop: 20,
    color: white
  }
})
export default Message