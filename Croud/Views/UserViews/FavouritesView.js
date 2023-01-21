import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'

const FavouritesView = ({userData}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favoriter</Text>
    </SafeAreaView>
  )
}

export default FavouritesView

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
  },

  title: {
    fontSize: "52px",
    fontWeight: "700",
  },

  t: {
    fontSize: "23px"
  }

})