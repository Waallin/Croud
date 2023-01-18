import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GamesComponent = ({opponent, time, day, location}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.t}>{opponent}</Text>
      <Text style={styles.t}>{day}</Text>
      <Text style={styles.t}>{time}</Text>
      <Text style={styles.t}>{location}</Text>
    </View>
  )
}

export default GamesComponent

const styles = StyleSheet.create({

    container: {
        flex: 1,
        borderWidth: 0.3,
        padding: 10,
        alignItems: "center",
    },

    t: {
        color: "white",
        fontSize: "20px"

    }
})