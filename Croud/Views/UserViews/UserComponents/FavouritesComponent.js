import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FavouritesComponent = ({team}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{team}</Text>
    </View>
  )
}

export default FavouritesComponent

const styles = StyleSheet.create({

  container: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "red",
    height: 70,
    marginTop: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: "25px",
    fontWeight: "600"
  }
})