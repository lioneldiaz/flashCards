import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { white, lightBlue } from '../../utils/Colors'

const SaveButton = ({children, onPress}) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={onPress}>
      <MaterialIcons style={{color: white}} name="note-add" size={30}/>
      <Text style={styles.textBtn}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  submitBtn: {
    marginTop: 20,
    borderRadius: 2,
    backgroundColor: lightBlue,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  textBtn: {
    textAlign: 'center',
    fontSize: 25,
    color: white,
    padding: 10,
  }
})
export default SaveButton