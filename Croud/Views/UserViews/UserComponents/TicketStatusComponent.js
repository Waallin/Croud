import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TicketStatusComponent = ({text, bg}) => {
  return (
    <View style={{...styles.container, backgroundColor: bg}}>
      <Text style={styles.txt}>{text}</Text>
    </View>
  )
}

export default TicketStatusComponent

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
    },

    txt: {
        color: "white",
        fontSize: "8px"
    }
})