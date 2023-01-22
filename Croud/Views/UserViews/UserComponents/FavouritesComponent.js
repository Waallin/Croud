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
    flex: 1,
    borderWidth: 0.3,
    borderRadius: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    padding: 15,
    alignItems: "center"

},
})