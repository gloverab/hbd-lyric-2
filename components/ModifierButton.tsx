import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";


export default function ModifierButton({isActive, text, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={isActive ? styles.buttonActive : styles.button}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center'
  },
  buttonActive: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'grey',
    borderRadius: 5,
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 18
  }
})