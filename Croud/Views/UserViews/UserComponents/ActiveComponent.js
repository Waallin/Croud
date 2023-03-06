import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../Styles/global'

const ActiveComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AKTIV</Text>
    </View>
  )
}

export default ActiveComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.primaryGreen,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },

    text: {
        paddingHorizontal: 5,
        fontSize: "8px",
        fontFamily: "Manrope_700Bold",
        color: "white"
    }
})