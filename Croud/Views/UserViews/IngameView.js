import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const IngameView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Välkommen!</Text>
      <Text>Du har precis blivit godkänd.</Text>
      <Text>Här kan du köpa lotter, rösta på matchens lirare osv.</Text>
    </SafeAreaView>
  )
}

export default IngameView

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})