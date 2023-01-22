import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';

const TicketView = ({route}) => {
    useEffect(() => {
        console.log(route.params.id)
    })
  return (
    <SafeAreaView style={styles.container}>
      <QRCode
      value={route.params.id}
      size={100}
      color='black'
      backgroundColor='lightblue'
      />
    </SafeAreaView>
  )
}

export default TicketView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue"
    }
})