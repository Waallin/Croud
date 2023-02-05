import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ActiveGameView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Matchen är aktiv!</Text>
    </SafeAreaView>
  )
}

export default ActiveGameView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})